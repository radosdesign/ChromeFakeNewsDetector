#!/usr/bin/env python

# This file is part of chrome-webstore-deploy
# Copyright (c) 2014 TheGrid
# May be freely distributed under the MIT license

import sys, os
import json
import mimetypes
import glob

import httplib2
from oauth2client import client
from oauth2client import tools
import oauth2client.tools
import oauth2client.file

# Configuration:

#
extension_zip = '../dist/extension.zip'
# One of 'trustedTesters' | 'default'
publish_target = 'trustedTesters'
# Extension ID:
extension_id = 'ajfhmidimnkpbhnkcckllicmhhdipmoo'


class ArgParseFakeFlags:

    def __init__(self):
        self.logging_level = 'ERROR'
        self.auth_host_name = 'localhost'
        self.auth_host_port = [8080, 8090]
        self.noauth_local_webserver = False


class ChromeWebStore(object):
    """
    See https://developer.chrome.com/webstore/using_webstore_api
    and https://developers.google.com/api-client-library/python/guide/aaa_oauth
    """

    def __init__(self):
        self.http = httplib2.Http()
        self.credentials = None
        self.api_base = "https://www.googleapis.com/chromewebstore/v1.1"
        self.api_base_upload = "https://www.googleapis.com/upload/chromewebstore/v1.1"
        self.api_scope = 'https://www.googleapis.com/auth/chromewebstore'
        self.common_headers = {
            "x-goog-api-version": "2",
        }

    def authorize(self, client_secrets, oauth2_storage, flags):
        print()
        client_secrets, oauth2_storage
        storage = oauth2client.file.Storage(oauth2_storage)
        self.credentials = storage.get()

        if self.credentials is None or self.credentials.invalid:
            print
            'WARNING: credentials invalid, doing OAuth dance'
            flow = client.flow_from_clientsecrets(client_secrets, scope=self.api_scope)
            self.credentials = oauth2client.tools.run_flow(flow, storage, flags)
        self.http = self.credentials.authorize(self.http)

    def upload(self, item_id, filename):
        file_content = open(filename, 'rb').read()
        content_type, body = 'application/octet-stream', file_content
        # encode_multipart_formdata([], [(filename, filename, file_content)])
        headers = dict(self.common_headers)
        headers.update({
            'Content-length': str(len(body)),
            'Content-Type': content_type,
        })
        url = self.api_base_upload + '/items/%s?uploadType=media' % (item_id,)
        print
        url, headers
        resp, content = self.http.request(url, "PUT", headers=headers, body=body)
        if resp['status'] != '200':
            raise ValueError('Could not upload, HTTP status != 200: %s, %s' % (str(resp), content))
        else:
            msg = json.loads(content)
            if msg['uploadState'] != 'SUCCESS':
                raise ValueError('Could not upload: %s' % (msg,))

    def publish(self, item_id, publish_target):
        headers = dict(self.common_headers)
        # Note: for some reason can't pass publishTarget as query string, even if docs say so
        headers.update({
            'publishTarget': publish_target,
            'Content-length': "0",
        })
        url = self.api_base + "/items/%s/publish" % (item_id,)
        print
        url, headers
        resp, content = self.http.request(url, "POST", headers=headers)
        if resp["status"] != '200':
            raise ValueError('Could not publish: %s, %s' % (str(resp), content))
        else:
            msg = json.loads(content)
            # Some funky version of the API returns a 1-item list of strings... Normalize
            status = msg['status']
            status = status if not hasattr(status, '__iter__') else status[0]
            if status != 'OK':
                raise ValueError('Could not publish: %s' % (msg,))


def do_upload():
    item = extension_id
    # From the service account created in https://console.developers.google.com
    secrets = os.environ.get("WEBSTORE_SECRETS_FILE", None)
    storage = os.environ.get("WEBSTORE_OAUTH2_FILE", None)

    if not secrets or not storage:
        sys.stderr.write("""ERROR: Chrome Web Store credentials not specified.
Environment variables WEBSTORE_SECRETS_FILE and WEBSTORE_OAUTH2_FILE\n\n""")
        sys.exit(2)

    # Run
    store = ChromeWebStore()
    flags = ArgParseFakeFlags()
    store.authorize(secrets, storage, flags)

    #
    # UPLOAD
    # Expand glob expression
    matches = glob.glob(extension_zip)
    upload = None if len(matches) != 1 else matches[0]
    if not upload:
        sys.stderr.write("ERROR: Expected 1 file to upload, found %d: %s\n" % (len(matches), repr(matches)))
        sys.exit(2)

    print
    'Uploading draft release %s for item %s' % (upload, item)
    store.upload(item, upload);

    #
    # PUBLISH
    print
    'Publishing draft release for item %s' % (item,)
    store.publish(item, publish_target)
