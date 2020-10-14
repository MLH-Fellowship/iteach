# zusammen

![alt](https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80)

## Summary
Zusammen is an app for non-professional teachers to teach. As a teacher, all you need is write a bio of why you could be qualified. Teaching is all done in one-on-one zoom sessions, and our platform just helps in booking these sessions.

## Additional information
"zusammen" means together in German. The app is for non-professional teachers to get students' bookings. Once you sign up, you have the option to be a teacher as well as a student at the same time. You don't have to be an expert teacher. All you need to apply as a teacher is to write a bio of why you could be qualified. Teaching is all done in one-on-one zoom sessions. zusammen helps in booking the sessions. 

## Future plans
1. As a teacher, once you collect a certain amount of points, you can start charging a fee for your sessions. You can teach whatever skill you think you are good at, from gym session training, to violin or coding an app.
2. In booking a session, you "the learner" as well as the "teacher" get a direct zoom link for that period as well as an update in your calendar and email.

## Motivation
A good teacher is someone who can transfer their passion and vision and skill to others. Everyone of us is a good teacher of some sort for the things they enjoy doing. Some have very niche skills, and others find it hard to acquire these skills. Some want an additional source of income, and others would like to discover new skills. The best way to learn something is to teach it, but sometimes it is not that easy to teach without having lots of qualifications and it ends up as a competition with professional teachers!

## Installation
```
npm install

cd api
npm install

cd view
npm install
npm start
```
## Tech Stack
- **Backend:** Node.js, Express
- **Database:** MongoDB (mongoose library)
- **Frontend:** React, Redux

## Folder Structure
```
.
├── api
│   ├── config
│   ├── models
└── view
    ├── public
    └── src
        ├── components 
        ├── constants
        └── reducers
```

## Database Structure
### Teacher
```
    id
    skill
    name
    surname
    bio
    profilePicture
    availability
```

### User
```
    email
    uid
    name
    surname
```
