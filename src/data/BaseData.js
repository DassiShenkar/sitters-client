let specialNeeds = ['ADD','Aphasia/Dysphagia','Auditory Processing','Autism','Cystic Fibrosis'];
let languages = [ // array of languages
    { value: 'english', label: 'English' },
    { value: 'hebrew', label: 'Hebrew' },
    { value: 'chinese', label: 'Chinese' },
    { value: 'russian', label: 'Russian' },
    { value: 'japanese', label: 'Japanese' },
    { value: 'german', label: 'German' },
    { value: 'french', label: 'French' },
    { value: 'spanish', label: 'Spanish' }
];
let questions =[{
    "question": "I consider myself as an investor in his own field",
    "category": "characteristics",
    "method": "normal",
    "choice": 0
},{
    "question": "I consider myself a responsible person",
    "category": "characteristics",
    "method": "normal",
    "choice": 0
},{
    "question": "I consider myself as having a sensitivity to the needs of others",
    "category": "characteristics",
    "method": "normal",
    "choice": 0
},{
    "question": "I used to invest mainly in the things I'm good, and to give up when I'm having difficulty",
    "category": "characteristics",
    "method": "reverse",
    "choice": 0
},{
    "question": "I consider myself as a creative person who can provide children with an interest",
    "category": "characteristics",
    "method": "normal",
    "choice": 0
},{
    "question": "It is important for me to know everything you expect me to clearly and completely",
    "category": "expectations",
    "method": "normal",
    "choice": 0
},{
    "question": "I consider myself punctual times",
    "category": "expectations",
    "method": "normal",
    "choice": 0
},{
    "question": "I believe I can fulfill the expectations of parents",
    "category": "expectations",
    "method": "normal",
    "choice": 0
},{
    "question": "It is important to me that parents will be satisfied with my work",
    "category": "expectations",
    "method": "normal",
    "choice": 0
},{
    "question": "I expect myself to demonstrate assertiveness in cases where children have demonstrated a lack of discipline",
    "category": "expectations",
    "method": "normal",
    "choice": 0
},{
    "question": "Especially problematic situations of stress I can't handle",
    "category": "Integrity",
    "method": "reverse",
    "choice": 0
},{
    "question": "I think that all people in the world are honest",
    "category": "Integrity",
    "method": "special",
    "choice": 0
},{
    "question": "At least once in life I took an object that belongs to someone without permission",
    "category": "Integrity",
    "method": "normal",
    "choice": 0
},{
    "question": "In the case of an extreme lack of knowledge of how to correctly operate, I will be relying on my intuition and not call to ask the parents.",
    "category": "Integrity",
    "method": "reverse",
    "choice": 0
},{
    "question": "The boy cursed his brother and will be punished if parents know, so you'd rather not tell his parents of child care",
    "category": "Integrity",
    "method": "reverse",
    "choice": 0
}];

let sitters = [
    {
        "_id": {
            "$oid": "58b337c1363032052ce7efb8"
        },
        "invites": [],
        "review": [],
        "specialNeeds": [],
        "hobbies": [],
        "education": [],
        "rating": 0,
        "languages": [],
        "profilePicture": "http://i.dailymail.co.uk/i/pix/2016/01/12/15/30169FCF00000578-3395841-image-a-4_1452613242890.jpg",
        "coverPhoto": "",
        "timezone": "4",
        "personalityScore": 80,
        "experience": 4,
        "maxAge": 6,
        "minAge": 0,
        "mobility": 1,
        "hourFee": 23,
        "email": "sitter3@gmail.com",
        "name": "Wanda Bishop",
        "gender": "female",
        "age": 22,
        "currencyType": "USD",
        "address": {
            "city": "Petah Tikva",
            "street": "Ben Tsiyon Galis",
            "houseNumber" : 48,
            "longitude": 34.888396,
            "latitude": 32.107225
        },
        "workingHours": {
            "sunday": {
                "start": "09:30",
                "finish": "12:00"
            },
            "monday": {
                "start": "12:30",
                "finish": "20:00"
            },
            "tuesday": {
                "start": "18:00",
                "finish": "23:00"
            },
            "wednesday": {
                "start": "08:00",
                "finish": "19:00"
            },
            "thursday": {
                "start": "12:00",
                "finish": "16:00"
            },
            "friday": {
                "start": "13:00",
                "finish": "18:00"
            },
            "saturday": {
                "start": "08:00",
                "finish": "23:00"
            }
        },
        "availableNow": true,
        "__v": 0
    },
    {
        "_id": {
            "$oid": "58d51f77ba78b10ac43bc09a"
        },
        "profilePicture": "http://maxpixel.freegreatpicture.com/static/photo/640/Baby-Happy-Fun-Girl-Face-Child-Daughter-Isolated-17346.jpg",
        "coverPhoto": "",
        "timezone": "4",
        "personalityScore": 85,
        "hourFee": 18,
        "email": "sitter1@gmail.com",
        "name": "Barbara Butler",
        "gender": "female",
        "age": 23,
        "currencyType": "USD",
        "address": {
            "city": "Ramat Gan",
            "street": "bialik",
            "houseNumber" : 140,
            "longitude": 34.803638,
            "latitude": 32.088505
        },
        "workingHours": {
            "saturday": {
                "finish": "16:00",
                "start": "10:00"
            },
            "friday": {
                "finish": "22:00",
                "start": "18:00"
            },
            "thursday": {
                "finish": "20:00",
                "start": "15:00"
            },
            "wednesday": {
                "finish": "19:00",
                "start": "12:00"
            },
            "tuesday": {
                "finish": "23:00",
                "start": "20:00"
            },
            "monday": {
                "finish": "21:00",
                "start": "15:30"
            },
            "sunday": {
                "finish": "23:00",
                "start": "20:00"
            }
        },
        "availableNow": true,
        "invites": [],
        "review": [],
        "expertise": [],
        "specialNeeds": [],
        "mobility": 1,
        "hobbies": [],
        "experience": 3,
        "maxAge": 10,
        "minAge": 3,
        "education": [],
        "rating": 0,
        "languages": [],
        "joinedTime": {
            "$date": "2017-03-24T13:30:31.976Z"
        },
        "__v": 0
    },
    {
        "_id": {
            "$oid": "58d51fe7ba78b10ac43bc09b"
        },
        "profilePicture": "http://maxpixel.freegreatpicture.com/static/photo/640/Family-Baby-Child-Happy-Happiness-Boy-Caucasian-164897.jpg",
        "coverPhoto": "",
        "timezone": "4",
        "personalityScore": 91,
        "hourFee": 28,
        "email": "sitter2@gmail.com",
        "name": "Shirley Clark",
        "gender": "female",
        "age": 28,
        "currencyType": "USD",
        "address": {
            "city": "Kfar Saba",
            "street": "Arlozorov",
            "houseNumber" : 40,
            "longitude": 34.905312,
            "latitude": 32.170644
        },
        "workingHours": {
            "saturday": {
                "finish": "20:00",
                "start": "10:00"
            },
            "friday": {
                "finish": "22:00",
                "start": "18:00"
            },
            "thursday": {
                "finish": "20:00",
                "start": "10:00"
            },
            "wednesday": {
                "finish": "17:00",
                "start": "13:00"
            },
            "tuesday": {
                "finish": "13:00",
                "start": "09:00"
            },
            "monday": {
                "finish": "18:00",
                "start": "14:30"
            },
            "sunday": {
                "finish": "23:00",
                "start": "18:00"
            }
        },
        "availableNow": true,
        "invites": [],
        "review": [],
        "expertise": [],
        "specialNeeds": [],
        "mobility": 1,
        "hobbies": [],
        "experience": 3,
        "maxAge": 12,
        "minAge": 4,
        "education": [],
        "rating": 0,
        "languages": [],
        "joinedTime": {
            "$date": "2017-03-24T13:32:23.067Z"
        },
        "__v": 0
    },
    {
        "_id": {
            "$oid": "58d5205cba78b10ac43bc09c"
        },
        "profilePicture": "https://cdn.pixabay.com/photo/2016/02/04/04/06/motherhood-1178577_960_720.jpg",
        "coverPhoto": "",
        "timezone": "4",
        "personalityScore": 78,
        "hourFee": 26,
        "email": "sitter4@gmail.com",
        "name": "Kimberly Martin",
        "gender": "female",
        "age": 33,
        "currencyType": "USD",
        "address": {
            "city": "Hadera",
            "street": "HaTsukim",
            "houseNumber" : 48,
            "longitude": 34.884634,
            "latitude": 32.428906
        },
        "workingHours": {
            "saturday": {
                "finish": "16:00",
                "start": "10:00"
            },
            "friday": {
                "finish": "22:00",
                "start": "08:00"
            },
            "thursday": {
                "finish": "20:00",
                "start": "15:00"
            },
            "wednesday": {
                "finish": "20:00",
                "start": "16:00"
            },
            "tuesday": {
                "finish": "23:00",
                "start": "20:00"
            },
            "monday": {
                "finish": "20:00",
                "start": "14:00"
            },
            "sunday": {
                "finish": "20:00",
                "start": "12:00"
            }
        },
        "availableNow": true,
        "invites": [],
        "review": [],
        "expertise": [],
        "specialNeeds": [],
        "mobility": 1,
        "hobbies": [],
        "experience": 3,
        "maxAge": 8,
        "minAge": 0,
        "education": [],
        "rating": 0,
        "languages": [],
        "joinedTime": {
            "$date": "2017-03-24T13:34:20.491Z"
        },
        "__v": 0
    },
    {
        "_id": {
            "$oid": "58d520d8ba78b10ac43bc09d"
        },
        "profilePicture": "http://www.publicdomainpictures.net/pictures/80000/velka/mother-with-the-baby.jpg",
        "coverPhoto": "",
        "timezone": "4",
        "personalityScore": 82,
        "hourFee": 29,
        "email": "sitter5@gmail.com",
        "name": "Carol Ward",
        "gender": "female",
        "age": 25,
        "currencyType": "USD",
        "address": {
            "city": "Petah Tikva",
            "street": "Ha-Kinamon",
            "houseNumber" : 2,
            "longitude": 34.890837,
            "latitude": 32.155276
        },
        "workingHours": {
            "saturday": {
                "finish": "16:00",
                "start": "10:00"
            },
            "friday": {
                "finish": "22:00",
                "start": "08:00"
            },
            "thursday": {
                "finish": "20:00",
                "start": "16:00"
            },
            "wednesday": {
                "finish": "20:00",
                "start": "10:00"
            },
            "tuesday": {
                "finish": "23:00",
                "start": "08:00"
            },
            "monday": {
                "finish": "19:00",
                "start": "15:00"
            },
            "sunday": {
                "finish": "22:00",
                "start": "16:00"
            }
        },
        "availableNow": true,
        "invites": [],
        "review": [],
        "expertise": [],
        "specialNeeds": [],
        "mobility": 1,
        "hobbies": [],
        "experience": 3,
        "maxAge": 7,
        "minAge": 2,
        "education": [],
        "rating": 0,
        "languages": [],
        "joinedTime": {
            "$date": "2017-03-24T13:36:24.347Z"
        },
        "__v": 0
    }
];

let parents = [
    {
        "_id": {
            "$oid": "58b337c1363032052ce7efb8"
        },
        "invites": [],
        "notifications:": [],
        "review": [],
        "specialNeeds": [],
        "hobbies": [],
        "education": [],
        "languages": [],
        "profilePicture": "http://i.dailymail.co.uk/i/pix/2016/01/12/15/30169FCF00000578-3395841-image-a-4_1452613242890.jpg",
        "coverPhoto": "",
        "timezone": "4",
        "maxAge": 6,
        "minAge": 0,
        "mobility": 1,
        "hourFee": 23,
        "email": "parent@gmail.com",
        "name": "Wanda Bishop",
        "gender": "female",
        "age": 22,
        "currencyType": "USD",
        "address": {
            "city": "Ramat Gan",
            "longitude": 0,
            "latitude": 0
        },
        "__v": 0
    },
    {
        "_id": {
            "$oid": "58d51f77ba78b10ac43bc09a"
        },
        "profilePicture": "http://maxpixel.freegreatpicture.com/static/photo/640/Baby-Happy-Fun-Girl-Face-Child-Daughter-Isolated-17346.jpg",
        "coverPhoto": "",
        "timezone": "4",
        "personalityScore": 85,
        "hourFee": 18,
        "email": "sitter1@gmail.com",
        "name": "Barbara Butler",
        "gender": "female",
        "age": 23,
        "currencyType": "USD",
        "address": {
            "city": "Ramat Gan",
            "longitude": 0,
            "latitude": 0
        },
        "invites": [{"title": "invite title"}, {"title": "invite title2"}],
        "notifications": [{"title": "notification title"}],
        "review": [],
        "expertise": [],
        "specialNeeds": [],
        "mobility": 1,
        "hobbies": [],
        "maxAge": 10,
        "minAge": 3,
        "education": [],
        "languages": [],
        "joinedTime": {
            "$date": "2017-03-24T13:30:31.976Z"
        },
        "__v": 0
    }
];


exports.getSpecialNeeds = () => {
    return specialNeeds;
};

exports.getLanguages = () => {
    return languages;
};

exports.getQuestions = () => {
    return questions;
};

exports.getSitters = () => {
    return sitters;
};

exports.getParents = () => {
    return parents;
};

