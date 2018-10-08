#!/usr/bin/env python

'''
PREREQUISITIES
--------------
 - Git
 - Npm
 - Python
'''

import subprocess


def log(message):
    '''
    Print message to the standard output
    '''

    print
    print(message)
    print


def build_dist_package():
    '''
    Build distribution package
    '''

    # Update GIT repo
    # TODO

    log('--> Install node modules')
    subprocess.call(["npm", "install"], cwd='../')

    log('--> Update sites')
    subprocess.call(["node", "generate-sites.js"], cwd='../')

    log('--> Create distribution binary file')
    subprocess.call(["grunt"], cwd='../')

    # Update extension in Webstore
    # TODO

    # Push changes to GIT repo
    log('--> Push changes to GIT repo')
    subprocess.call(["git", "add", "extension/sites.js"], cwd='../')
    subprocess.call(["git", "commit", "-m", "Version updated"], cwd='../')
    subprocess.call(["git", "push"], cwd='../')
    # TODO


if __name__ == '__main__':
    build_dist_package()
