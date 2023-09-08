import smtplib
from email.mime.text import MIMEText
from email.mime.image import MIMEImage
from email.mime.multipart import MIMEMultipart
from ImageGenerator import * 
import requests
from datetime import date
import datetime
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import calendar
import pandas as pd
import os

sender_email = "h2noapp@gmail.com"
sender_password = ""

subject = "Your Monthly H2NO Update"
body = ""

recipient_email = ""

server = 0

def generate_and_send(curr_acc, db, server):
    recipient_email = curr_acc.get('Email')

    curr_uid = curr_acc.get('ID')

    docs = db.collection(u'friendships').where(u'Base', u'==', curr_uid).stream()

    friends = []
    for doc in docs:
        friends.append(doc.to_dict().get('Friend'))

    docs = db.collection(u'posts').where(u'uid', u'in', friends).stream()

    posts = []
    total_posts = 0
    for doc in docs:
        posts.append(doc.to_dict())
        total_posts += 1

    if total_posts < 2:
        return

    posts = sorted(posts, key=lambda d: d['Date'], reverse=True) 
    
    docs = db.collection(u'water_usage').where(u'ID', u'in', friends).stream()

    water_usages = []
    friends_usage_count = 0
    for doc in docs:
        water_usages.append(doc.to_dict())
        friends_usage_count += 1
    
    if friends_usage_count < 2:
        return

    top_friends = []
    friend_count = 0
    total_friend_use = 0

    for water in water_usages:
        this_friend_use = 0;

        this_friend_use += float(water.get('DishLoads')) * 2
        this_friend_use += float(water.get('HouseholdMembers')) * float(water.get('ShowerCount')) * float(water.get('ShowerLength'))
        this_friend_use += float(water.get('LaundryLoads')) * 4
        this_friend_use += float(water.get('MinutesWater'))

        top_friends.append({'id' : water.get('ID'), 'usage' : this_friend_use})
        friend_count += 1
        total_friend_use += this_friend_use

    average_friend_use = total_friend_use / friend_count
    top_friends = sorted(top_friends, key=lambda d: d['usage']) 

    docs = db.collection(u'water_usage').where(u'ID', u'==', curr_acc.get('ID')).stream()

    my_usage = 0
    for doc in docs:
        my_usage_dict = doc.to_dict()
        
        my_usage += float(my_usage_dict.get('DishLoads')) * 2
        my_usage += float(my_usage_dict.get('HouseholdMembers')) * float(my_usage_dict.get('ShowerCount')) * float(my_usage_dict.get('ShowerLength'))
        my_usage += float(my_usage_dict.get('LaundryLoads')) * 4
        my_usage += float(my_usage_dict.get('MinutesWater'))

    my_usage_percentage = int((my_usage / average_friend_use) * 100)

    if my_usage_percentage >= 100:
        GenerateProgress(100)
    else:
        GenerateProgress(my_usage_percentage)

    with open('body_1.html', 'r') as f:
        body = f.read()

    month_num = str(date.today().month)
    datetime_object = datetime.datetime.strptime(month_num, "%m")
    full_month_name = datetime_object.strftime("%B")
    year = date.today().year
    
    body += full_month_name + ", " + str(year)
    with open('body_2.html', 'r') as f:
        body += f.read()
    
    #First social post
    post_count = len(posts)

    if post_count >= 2:
        first_post = posts[0]
        first_full_name = first_post.get('FullName')
        first_post_date = first_post.get('Date')
        first_post_body = first_post.get('Body')

        body += first_full_name

        with open('body_3.html', 'r') as f:
            body += f.read()

        body += str(first_post_date.month) + "-" + str(first_post_date.day) + "-" + str(first_post_date.year)

        with open('body_4.html', 'r') as f:
            body += f.read()
        
        body += first_post_body

        with open('body_5.html', 'r') as f:
            body += f.read()
        
        second_post = posts[1]
        second_full_name = second_post.get('FullName')
        second_post_date = second_post.get('Date')
        second_post_body = second_post.get('Body')

        body += second_full_name

        with open('body_6.html', 'r') as f:
            body += f.read()

        body += str(second_post_date.month) + "-" + str(second_post_date.day) + "-" + str(second_post_date.year)

        with open('body_7.html', 'r') as f:
            body += f.read()

        body += second_post_body

        with open('body_8.html', 'r') as f:
            body += f.read()

        body += "cid:generated_droplet.jpg"

        with open('body_9.html', 'r') as f:
            body += f.read()

        body += "You use " + str(int(my_usage_percentage)) + "% of your friend's combined average!"

        with open('body_10.html', 'r') as f:
            body += f.read()

        top_friends_count = len(friends)
        body += "<font size=\"+2\">Friend's Usage</font>"
        friend_num = 1
        for top_friend in top_friends:
            if friend_num > 5:
                break

            body += "<br />"
            body += str(friend_num) + ". " 
            body +=  get_friend_name(top_friend.get('id'), db)
            body += ", " + str(int((top_friend.get('usage') / average_friend_use) * 100)) + "%"

            friend_num += 1

        with open('body_11.html', 'r') as f:
            body += f.read()

    html_message = MIMEMultipart("related")
    
    html_message['Subject'] = subject
    html_message['From'] = sender_email
    html_message['To'] = recipient_email

    html_message.attach(MIMEText(body, 'html'))

    imagename = './generated_droplet.jpg'
    with open(imagename, 'rb') as fp:
        img = MIMEImage(fp.read())
    img.add_header("Content-ID", "<{}>".format('generated_droplet.jpg'))
    html_message.attach(img)

    server.sendmail(sender_email, recipient_email, html_message.as_string())

def get_friend_name(friend_id, db):
    docs = db.collection(u'users').where(u'ID', u'==', friend_id).stream()

    for doc in docs:
        return doc.to_dict().get('Name')


def main():
    cred = credentials.Certificate()
    firebase_admin.initialize_app(cred)
    db = firestore.client()

    server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
    server.login(sender_email, sender_password)

    docs = db.collection(u'users').where(u'EmailOptIn', u'==', True).where(u'DataOptIn', u'==', True).stream()

    accounts = []
    for doc in docs:
        accounts.append(doc.to_dict())

    for account in accounts:
        generate_and_send(account, db, server)

    server.quit()

if __name__ == '__main__':
    main()