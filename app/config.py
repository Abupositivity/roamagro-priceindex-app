#!/usr/bin/python3
"""
Configuration file to manage config settings
"""
import os
basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    SQLALCHEMY_DATABASE_URI = 'postgresql://abupositivity:4737@localhost:5432/roamagro_db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
