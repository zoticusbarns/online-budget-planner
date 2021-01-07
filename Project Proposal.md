# Project Proposal


## Features

### Login System

#### Register
Create a user register page for new user to create new account
Include input validations
To create an new account, user needs to input email address for login, password, re-enter password

#### Login
Create login page for registered user to sign in
Authenticate password against hashed password stored in database
re-direct user to home page upon successful login

### Budget Planner

#### Set up plan
Create page for user to create a plan
Choose period for the plan (n days, n weeks, n months, n years)
Enter planned amount for each spending categories per time period
Allow to create new customized categories
Store plans in database

#### Spending Diary
Create editor for user to record, view and edit everyday spending
Editor read from database upon being opened by user
Modify database when user click save in the editor

#### Budget Plan Tracking
Compare historical spending against user's plan
Project users future spending using regression model
Analysis user's spending pattern and give suggestions

### Settings

#### Account
Create account settings page for user to change email, password and delete account

#### Language
Select application interface language


## Security

### SQL injections
use parameterized queries

### User Data Security
encrypt user spending and budget plans data using hash functions
hash user password before storing in the database


## Timeline
Complete project in 6 months (around June)
