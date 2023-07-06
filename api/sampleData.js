const employer = [
    {
        id:'1',
        companyId:'2',
        name:'Johnatan smiths',
        email:'john@gmail.com',
        phone:'555-444-333',
        bithdate:'20/03/1983',
        address:'madison square garden-r4',
        password:"mypassword",
        bio:"This document is an overview of the git mergecommand. Merging is an essential process when working with Git.. Some key take-aways are: 1. Git merging combines sequences of commits into one unified history of commits. 2."
    }
]

const jobOffer = [
    {
        id:'1',
        employerId:'1',
        title:'hair dresser',
        description:"This document is an overview of the git mergecommand. Merging is an essential process when working with Git. We discussed the internal mechanics behind a merge and the differences between a fast forward merge and a three way, true merge. Some key take-aways are: 1. Git merging combines sequences of commits into one unified history of commits. 2.",
        requirements:[
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
            'Dolor sit amet, consectetur adipisicing elit.',
            'Lorem ipsum dolor adipisicing elit.',
            'Consectetur adipisicing elit.'
        ],
        benefits:[
            'Obcaecati quisquam maiores quod vero eligendi in, suscipit facilis.',
            'Rem quam doloremque nihil iure nam nobis saepe hic ex nostrum! Error, vero.',
            'nihil iure nam nobis saepe hic ex. Rem quam doloremque',
        ],
        tasks:[
            'Caecati quisquam maiores quod vero eligendi in.',
            'Lorem ipsum dolor adipisicing elit.',
            'Consectetur adipisicing elit.',
            'Dolor sit amet, consectetur adipisicing elit.',
            'Consectetur adipisicing elit.',
            'Dolor Sit amet, consectetur adipisicing elit.'
        ],
        category: 1,
        industry: 1,
        company: 1,
    }
]

module.exports = {
    employer,
    jobOffer
}