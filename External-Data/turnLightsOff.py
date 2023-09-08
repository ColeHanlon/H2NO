import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

#this file adds users who have their lights on to the corresponding collection in firestore
def getUsersWithLightsOn(db):
    res = set()
    docs = db.collection(u'smart_home').stream()

    for doc in docs:
        dict = doc.to_dict()
        for light in dict['lights']:
            if light['on']:
                res.add(light['ID'])

    return res

if __name__ == '__main__':
    # FILL IN WITH CREDENTIALS
    cred = credentials.Certificate()
    firebase_admin.initialize_app(cred)

    db = firestore.client()

    users = getUsersWithLightsOn(db)

    for user in users:
        db.collection(u'UsersWithLightsOn').document(user).set({"on": "true"})
