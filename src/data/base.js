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

exports.getSpecialNeeds = () => {
    return specialNeeds;
};

exports.getLanguages = () => {
    return languages;
};

