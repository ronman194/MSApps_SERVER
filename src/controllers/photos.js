const axios = require('axios');

const getAllPhotos = async (req, res) => {
    try {
        let photos = {}

        // get photos from Pixabay API
        const response = await axios.get('https://pixabay.com/api/?key=25540812-faf2b76d586c1787d2dd02736');
        photos = response.data.hits;

        const allTags = new Set();

        // extract unique tags from photos
        photos.forEach(photo => {
            const tags = photo.tags.split(", ");
            tags.forEach(tag => allTags.add(tag));
        });

        // prepare categories for react select
        const uniqueTags = Array.from(allTags);
        let categories = uniqueTags.map((item) => ({
            value: item,
            label: item,
        }));
        categories.unshift({ value: '', label: '--Choose an option--' })

        // return response with photos and categories
        return res.status(200).send({ "photos": response.data.hits, "tags": categories });
    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'err': err.message
        });
    }
}

const getPhotosByCategory = async (req, res) => {
    console.log(req.query.category)
    const category = req.query.category;
    // if not category, call getAllPhotos function
    if (category == null || undefined || "") {
        return getAllPhotos()
    }
    else {
        try {
            // get photos of the selected category from Pixabay API
            const response = await axios.get(`https://pixabay.com/api/?key=25540812-faf2b76d586c1787d2dd02736&q=${category}`);

            // return response with photos and category
            return res.status(200).send({ "photos": response.data.hits, "category": category });
        } catch (err) {
            res.status(400).send({
                'status': 'fail',
                'err': err.message
            });
        }
    }
}


module.exports = { getAllPhotos, getPhotosByCategory }