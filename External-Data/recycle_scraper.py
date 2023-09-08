# Need to install BeautifulSoup --> pip install beautifulsoup4

from bs4 import BeautifulSoup
import urllib.request
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

def getCountyLinks():
    """
    Scrapes the Utah County Recycling map for the recycling info links for each county
    :return:
    """
    # Get the Utah County Recycling map HTML and create soup
    parser = 'html.parser'
    resp = urllib.request.urlopen("https://deq.utah.gov/waste-management-and-radiation-control/recycling-information-for-utah-by-county")
    soup = BeautifulSoup(resp, parser, from_encoding=resp.info().get_param('charset'))

    addLinks = False
    countyRecyclingInfoLinks = []

    # Go through all href links on the page, only add county recycling links to the list
    for link in soup.find_all('a', href=True):
        if link['href'] == "https://deq.utah.gov/waste-management-and-radiation-control/beaver-county-recycling-information":
            addLinks = True

        if addLinks:
            countyRecyclingInfoLinks.append(link['href'])

        if link['href'] == "https://deq.utah.gov/waste-management-and-radiation-control/weber-county-recycling-information":
            addLinks = False

    return countyRecyclingInfoLinks


def getSingleCountyContacts(countyURL):
    """
    Returns the county name, a list of names of the contacts from a county recycling page,
    and a list their corresponding contact info.
    The names in the names list will be 1-1 with the contact info list

    Ex: names =       [Dave,                             Larry]
        contactInfo = [[dave@yahoo.com, (123)456-7890],  [larry@heehaw.net, (987)654-3210]]

    :param countyURL:
    :return:
    """
    parser = 'html.parser'
    resp = urllib.request.urlopen(countyURL)
    soup = BeautifulSoup(resp, parser, from_encoding=resp.info().get_param('charset'))

    # Get the county name from the page
    county_name_line = soup.find('title')
    county_name = extract_county_name(county_name_line.text)

    if county_name == "Davis County":
        # Davis county contact info
        return scrape_davis(soup)

    contactInfo =  []
    # Gets emails and phone numbers -- seems like it goes in order of contact
    for i in soup.find_all('h2'):
        if i.text == "County Contacts":
            # Find the unordered list that contains the contacts
            ul = i.findNext('ul')

            if county_name != "Sevier County":
                # Go through each contact in the list and get their contact info
                for li in ul.findAll('li'):
                    currContactInfo = []
                    for br in li.findAll('a'):
                        currContactInfo.append(br.text)
                    contactInfo.append(currContactInfo)
            else:
                # Go through each contact in the list and get their contact info
                for li in ul.findAll('li'):
                    currContactInfo = []
                    secondContactInfo = []
                    count = 0
                    for br in li.findAll('a'):
                        if count < 2:
                            currContactInfo.append(br.text)
                            count += 1
                            if len(currContactInfo) == 2:
                                contactInfo.append(currContactInfo)
                        else:
                            secondContactInfo.append(br.text)
                            count += 1
                            if len(secondContactInfo) == 2:
                                contactInfo.append(secondContactInfo)

    # Working -- gets names of contacts
    names = []
    for i in soup.find_all('h2'):
        if i.text == "County Contacts":
            # Find the unordered list that contains the contacts
            ul = i.findNext('ul')

            # The names of contacts will be before the 'a' tag
            for a in ul.findAll('a'):
                name = ""
                if "<br" in str(a.previousSibling):
                    if ")" in str((a.previousSibling).previousSibling):
                        continue
                    else:
                        name = extract_name(((a.previousSibling).previousSibling).text)
                else:
                    name = extract_name((a.previousSibling).text)

                # Add name if it is not an empty string
                if name != "":
                    names.append(name)

    return county_name, names, contactInfo


def scrape_davis(soup):
    """
    Scrape the Davis County Recycle page
    :param soup: The HTML of the page
    :return: Davis County, list of Contact names and a list of their contact info
    """
    contact_info = []
    contact_names = []
    # Davis county contact info
    for i in soup.find_all('h2'):
        if i.text == "County Contacts":
            curr_p = i.findNext('p')
            # Get the contact info
            for i in range(2):
                curr_contact_info = []
                for a in curr_p.findAll('a'):
                    # Save current contact info
                    curr_contact_info.append(a.text)

                    # Get the name of the contact
                    name = ""
                    if "<br" in str(a.previousSibling):
                        if ")" in str((a.previousSibling).previousSibling):
                            continue
                        else:
                            name = ((a.previousSibling).previousSibling).text
                    else:
                        name = (a.previousSibling).text
                    contact_names.append(extract_name(name))

                curr_p = curr_p.findNext('p')
                contact_info.append(curr_contact_info)
    return "Davis County", contact_names, contact_info


def extract_name(name_words):
    """
    Extracts the name from a string, strips off the extra characters
    :param name_words: the string that contains the name
    :return: a string with just the name
    """
    split_name = name_words.split(' ')
    extracted_name = ""
    for name in split_name:
        if name.isalpha():
            extracted_name += " " + name
    return extracted_name.strip()


def extract_county_name(county_string):
    """
    Extracts the county name from a given string
    :param county_string: the string that contains the county name
    :return: a string with just the county name
    """
    county_words = county_string.split(' ')
    county_name = ""
    for word in county_words:
        if word == "Recycling":
            break
        county_name += " " + word

    return county_name.strip()


def get_contact_info_dict(county_links):
    """
    Create a dictionary of counties to their contacts
    :param county_links: list of county links
    :return: dictionary of county mapped to list of contacts
    """
    # key = county name, value = list of contacts and their info
    county_contact_dict = {}
    for countyURL in county_links:
        county_name, names, contact_info = getSingleCountyContacts(countyURL)

        # Add the contact to the county dictionary
        curr_index = 0
        for name in names:
            if county_contact_dict.get(county_name):
                county_contact_dict[county_name].append(combine_contact_info(names[curr_index], contact_info[curr_index]))
            else:
                county_contact_dict[county_name] = [combine_contact_info(names[curr_index], contact_info[curr_index])]
            curr_index += 1

    return county_contact_dict


def combine_contact_info(name_string, info_list):
    """
    Combines the contact name with their information into one list
    :param name_string: Name of the contact
    :param info_list: List of contact information
    :return: A single list that contains the name and contact information -- name comes first
    """
    contact_info_list = []
    contact_info_list.append(name_string)
    for item in info_list:
        contact_info_list.append(item)
    return contact_info_list


def add_to_database(db, contact_info_dict):
    """
    Adds the contact information to the database
    :param db:
    :return:
    """
    for county, contact_list in contact_info_dict.items():
        # Go through each contact for a county
        for curr_contact in contact_list:
            curr_contact_name = curr_contact[0]
            curr_contact_email = "N/A"
            curr_contact_phone = "N/A"
            # Go through contact's info list
            for item in curr_contact[1:]:
                if "@" in item:
                    curr_contact_email = item
                else:
                    # Add missing open parentheses to phone number if necessary
                    if item[0] != "(":
                        curr_contact_phone = "(" + item
                    else:
                        curr_contact_phone = item
                    
            # Add the contact to the database
            doc_ref = db.collection(u'recycle_contacts').document(curr_contact_name)
            doc = doc_ref.get()
            if doc.exists:
                prevCounty = doc.get('County')
                if county in prevCounty:
                    continue
                else:
                    doc_ref.update({"County":prevCounty + ", " + county})
            else:
                doc_ref.set({
                    u'Name': curr_contact_name,
                    u'Email': curr_contact_email,
                    u'Phone Number': curr_contact_phone,
                    u'County': county
                })


def main():
    # FILL IN WITH CREDENTIALS
    cred = credentials.Certificate()
    firebase_admin.initialize_app(cred)
    db = firestore.client()

    countyLinks = getCountyLinks()
    contact_info_dict = get_contact_info_dict(countyLinks)
    add_to_database(db, contact_info_dict)
    
    # print(getSingleCountyContacts("https://deq.utah.gov/waste-management-and-radiation-control/emery-county-recycling-information"))



if __name__ == '__main__':
    main()
