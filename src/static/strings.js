const strings = {
    APP_NAME: "Sitters",
    VERSION: "Alpha",
    LOCALHOST: "http://localhost:4444/",
    WEBSITE: "https://sitters-server.herokuapp.com/",
    DEBUG: true,
    ACTIVATE_BLACKLIST: false,
    ACTIVATE_MEDIAN: false,
    DEVELOPERS: "Arel Gindos, Dassi Rosen, Gregory K",
    GOOGLE_APIKEY: "AIzaSyDHmEuwmAbej_-gf6v_-ujdAS8B5fOOlX0",
    APP_DESCRIPTION: "A Booking Platform for Parents and Sitters",
    USER_TYPE: ["I'm a Parent", "I'm a Sitter"],
    GENDER: ["Male", "Female"],
    BOOLEAN: ["True", "False"],
    WEEK_DAYS: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    QUESTIONS: [{
        label1: "Mature",
        label2: "Youthful",
        value: 2
    }, {
        label1: "Playful",
        label2: "Sophisticated",
        value: 2
    }, {
        label1: "Patient",
        label2: "Witty",
        value: 2
    }, {
        label1: "Soft",
        label2: "Strict",
        value: 2
    }, {
        label1: "Stay-at-home",
        label2: "Outdoorsy",
        value: 2
    }, {
        label1: "Funny",
        label2: "Serious",
        value: 2
    }, {
        label1: "Adventurous",
        label2: "Laid back",
        value: 2
    }, {
        label1: "Religious\\Spiritual",
        label2: "Atheistic",
        value: 2
    }, {
        label1: "Gracious",
        label2: "Loud",
        value: 2
    }, {
        label1: "Sensitive",
        label2: "Authoritative",
        value: 2
    }],
    EDUCATION: [
        {value: 'high school', label: 'High School'},
        {value: 'college', label: 'College'},
        {value: 'graduate', label: 'Graduate'},
        {value: 'bachelor', label: 'Bachelor'},
        {value: 'master', label: 'Master'}
    ],
    LANGUAGES: [
        {value: 'arabic', label: 'Arabic'},
        {value: 'bengali', label: 'Bengali'},
        {value: 'chinese', label: 'Chinese'},
        {value: 'dutch', label: 'Dutch'},
        {value: 'english', label: 'English'},
        {value: 'french', label: 'French'},
        {value: 'german', label: 'German'},
        {value: 'hebrew', label: 'Hebrew'},
        {value: 'hindi', label: 'Hindi'},
        {value: 'hungarian', label: 'Hungarian'},
        {value: 'italian', label: 'Italian'},
        {value: 'japanese', label: 'Japanese'},
        {value: 'korean', label: 'Korean'},
        {value: 'marathi', label: 'Marathi'},
        {value: 'polish', label: 'Polish'},
        {value: 'portuguese', label: 'Portuguese'},
        {value: 'russian', label: 'Russian'},
        {value: 'spanish', label: 'Spanish'},
        {value: 'swedish', label: 'Swedish'},
        {value: 'turkish', label: 'Turkish'},
        {value: 'ukrainian', label: 'Ukrainian'},
        {value: 'vietnamese', label: 'Vietnamese'}
    ],
    HOBBIES:[
        {value: 'air sports', label: 'Air sports'},
        {value: 'baking', label: 'Baking'},
        {value: 'balloon twisting', label: 'Balloon Twisting'},
        {value: 'baseball', label: 'Baseball'},
        {value: 'basketball', label: 'Basketball'},
        {value: 'board games', label: 'Board Games'},
        {value: 'camping', label: 'Camping'},
        {value: 'coin collecting', label: 'Coin Collecting'},
        {value: 'comic book collecting', label: 'Comic Book Collecting'},
        {value: 'computer programming', label: 'Computer Programming[9'},
        {value: 'cooking', label: 'Cooking'},
        {value: 'crafts', label: 'Crafts'},
        {value: 'cycling', label: 'Cycling'},
        {value: 'dancing', label: 'Dancing'},
        {value: 'drawing', label: 'Drawing'},
        {value: 'electronics', label: 'Electronics'},
        {value: 'fashion', label: 'Fashion'},
        {value: 'fishing', label: 'Fishing'},
        {value: 'football', label: 'Football'},
        {value: 'gardening', label: 'Gardening'},
        {value: 'hiking', label: 'Hiking'},
        {value: 'horse riding', label: 'Horse Riding'},
        {value: 'ice skating', label: 'Ice Skating'},
        {value: 'legos', label: 'LEGOs'},
        {value: 'magic', label: 'Magic'},
        {value: 'music', label: 'Music'},
        {value: 'origami', label: 'Origami'},
        {value: 'painting', label: 'Painting'},
        {value: 'photography', label: 'Photography'},
        {value: 'puzzles', label: 'Puzzles'},
        {value: 'reading', label: 'Reading'},
        {value: 'scrapbook', label: 'Scrapbook'},
        {value: 'singing', label: 'Singing'},
        {value: 'skateboarding', label: 'Skateboarding'},
        {value: 'swimming', label: 'Swimming'},
        {value: 'video gaming', label: 'Video Gaming'},
        {value: 'watching television', label: 'Watching Television'},
        {value: 'yoga', label: 'Yoga'},
        {value: 'sudoku', label: 'Sudoku'},
        {value: '3d painting', label: '3D Painting'}
    ],
    SPECIAL_NEEDS: [
        {value: 'add', label: 'ADD'},
        {value: 'adhd', label: 'ADHD'},
        {value: 'aphasia', label: 'Aphasia'},
        {value: 'apraxia', label: 'Apraxia'},
        {value: 'asperger', label: 'Asperger'},
        {value: 'auditory processing', label: 'Auditory Processing'},
        {value: 'autism', label: 'Autism'},
        {value: 'cystic fibrosis', label: 'Cystic Fibrosis'},
        {value: 'cerebral palsy', label: 'Cerebral Palsy'},
        {value: 'developmental delays', label: 'Developmental Delays'},
        {value: 'down syndrome', label: 'Down Syndrome'},
        {value: 'dyslexia', label: 'Dyslexia'},
        {value: 'dysphagia', label: 'Dysphagia'},
        {value: 'dyspraxia', label: 'Dyspraxia'},
        {value: 'emotional', label: 'Emotional'},
        {value: 'fragile "X"', label: 'Fragile "X"'},
        {value: 'hearing impaired', label: 'Hearing Impaired'},
        {value: 'learning disabilities', label: 'Learning Disabilities'},
        {value: 'mental retardation', label: 'Mental Retardation'},
        {value: 'neurological disabilities', label: 'Neurological Disabilities'},
        {value: 'seizure disorder', label: 'Seizure Disorder'}
    ],
    EXPERTISE: [
        {value: 'math', label: 'Math'},
        {value: 'english', label: 'English'},
        {value: 'physics', label: 'Physics'},
        {value: 'history', label: 'History'},
        {value: 'languages', label: 'Languages'},
        {value: 'science', label: 'Science'},
        {value: 'art', label: 'Art'},
        {value: 'music', label: 'Music'},
        {value: 'drama', label: 'Drama'},
        {value: 'sports', label: 'Sports'},
        {value: 'tech', label: 'Tech'},
        {value: 'social studies', label: 'Social Studies'},
    ]
};
export default strings;
