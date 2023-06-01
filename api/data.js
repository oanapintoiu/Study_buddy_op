const Category = require('./models/category.js');
const Subcategory = require('./models/subcategory');

const categories = [
  {
    name: 'Science, Technology, Engineering, and Mathematics (STEM)',
    subcategories: [
      'Aerospace Engineering',
      'Biochemistry',
      'Biology',
      'Biomedical Engineering',
      'Biotechnology',
      'Chemical Engineering',
      'Chemistry',
      'Civil Engineering',
      'Computer Science',
      'Data Science',
      'Electrical Engineering',
      'Environmental Science/Studies',
      'Geology',
      'Mathematics',
      'Mechanical Engineering',
      'Nanotechnology',
      'Physics',
      'Statistics',
    ],
  },
  {
    name: 'Social Sciences and Humanities',
    subcategories: [
      'Anthropology',
      'Archaeology',
      'Classics',
      'Communication Studies',
      'Comparative Literature',
      'Criminology',
      'Cultural Studies',
      'Economics',
      'Education',
      'English Literature',
      'Ethnic Studies',
      'Film Studies',
      'Geography',
      'History',
      'International Relations',
      'Journalism',
      'Linguistics',
      'Philosophy',
      'Political Science',
      'Psychology',
      'Religious Studies',
      'Social Work',
      'Sociology',
      "Women's and Gender Studies",
      'Writing and Rhetoric',
    ],
  },
  {
    name: 'Business and Management',
    subcategories: [
      'Accounting',
      'Business Administration',
      'Entrepreneurship',
      'Finance',
      'Human Resource Management',
      'International Business',
      'Management',
      'Marketing',
      'Operations Management',
    ],
  },
  {
    name: 'Health and Medicine',
    subcategories: [
      'Dentistry',
      'Medicine',
      'Nursing',
      'Nutrition',
      'Occupational Therapy',
      'Pharmacy',
      'Physical Education',
      'Public Health',
      'Speech-Language Pathology',
    ],
  },
  {
    name: 'Fine Arts and Design',
    subcategories: [
      'Animation',
      'Architecture',
      'Art History',
      'Fashion Design',
      'Graphic Design',
      'Music',
      'Photography',
      'Product Design',
      'Theater and Performance Studies',
      'Visual Arts',
    ],
  },
  {
    name: 'Social Sciences and Humanities',
    subcategories: [
      'Anthropology',
      'Archaeology',
      'Classics',
      'Communication Studies',
      'Comparative Literature',
      'Criminology',
      'Cultural Studies',
      'Economics',
      'Education',
      'English Literature',
      'Ethnic Studies',
      'Film Studies',
      'Geography',
      'History',
      'International Relations',
      'Journalism',
      'Linguistics',
      'Philosophy',
      'Political Science',
      'Psychology',
      'Religious Studies',
      'Social Work',
      'Sociology',
      "Women's and Gender Studies",
      'Writing and Rhetoric',
    ],
  },
];

const populateDatabase = async () => {
  try {
    await Category.deleteMany();
    await Subcategory.deleteMany();

    for (const categoryData of categories) {
      const category = new Category({ name: categoryData.name });
      await category.save();

      for (const subcategoryName of categoryData.subcategories) {
        const subcategory = new Subcategory({
          name: subcategoryName,
          category: category._id,
        });
        await subcategory.save();
      }
    }

    console.log('Database populated successfully.');
  } catch (error) {
    console.error('Error populating database:', error);
  }
};

module.exports = populateDatabase;