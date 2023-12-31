from exponent_server_sdk import (
    DeviceNotRegisteredError,
    PushClient,
    PushMessage,
    PushServerError,
    PushTicketError,
)
import os
import requests
from requests.exceptions import ConnectionError, HTTPError

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

import rollbar

#this file sends notifications to users who are in the 'UsersWithLightsOn' collection

def init(expoToken):
    rollbar.init(
    access_token='',
    environment='testenv',
    code_version='1.0'
    )
    rollbar.report_message('Rollbar is configured correctly', 'info')

    # Optionally providing an access token within a session if you have enabled push security
    session = requests.Session()
    session.headers.update(
        {
            "Authorization": f"Bearer {os.getenv(expoToken)}",
            "accept": "application/json",
            "accept-encoding": "gzip, deflate",
            "content-type": "application/json",
        }
    )

# Basic arguments. You should extend this function with the push features you
# want to use, or simply pass in a `PushMessage` object.
def send_push_message(token, message, extra=None):
    try:
        response = PushClient().publish(
            PushMessage(to=token,
                        body=message,
                        data=extra))
    except PushServerError as exc:
        # Encountered some likely formatting/validation error.
        rollbar.report_exc_info(
            extra_data={
                'token': token,
                'message': message,
                'extra': extra,
                'errors': exc.errors,
                'response_data': exc.response_data,
            })
        raise
    except (ConnectionError, HTTPError) as exc:
        # Encountered some Connection or HTTP error - retry a few times in
        # case it is transient.
        rollbar.report_exc_info(
            extra_data={'token': token, 'message': message, 'extra': extra})
        raise self.retry(exc=exc)

    try:
        # We got a response back, but we don't know whether it's an error yet.
        # This call raises errors so we can handle them with normal exception
        # flows.
        response.validate_response()
    except DeviceNotRegisteredError:
        # Mark the push token as inactive
        from notifications.models import PushToken
        PushToken.objects.filter(token=token).update(active=False)
    except PushTicketError as exc:
        # Encountered some other per-notification error.
        rollbar.report_exc_info(
            extra_data={
                'token': token,
                'message': message,
                'extra': extra,
                'push_response': exc.push_response._asdict(),
            })
        raise self.retry(exc=exc)

if __name__ == '__main__':

    #iterate through users who have their lights turned on and send them a message
    cred = credentials.Certificate()
    firebase_admin.initialize_app(cred)
    db = firestore.client()

    users = db.collection(u'push_tokens').stream()
    
    for user in users:
        user_dict = user.to_dict()
        init(user_dict['token'])
        send_push_message(user_dict['token'], 'Hey! You should consider turning your lights off to save energy 🌎')