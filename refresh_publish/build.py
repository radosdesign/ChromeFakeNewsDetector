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

    log('--> Install node modules')
    subprocess.call(["npm", "install"], cwd='../')

    log('--> Create distribution binary file')
    subprocess.call(["grunt"], cwd='../')




if __name__ == '__main__':
    build_dist_package()
