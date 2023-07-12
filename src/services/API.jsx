import axios from 'axios';

const API_KEY = '36598390-cbdb1c2a048b1a21985e72a4d';

axios.defaults.baseURL = 'https://pixabay.com/api';
axios.defaults.params = {
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
};

export const fetchImages = async (value, page) => {
  const params = {
    q: value,
    page,
  };

  const { data } = await axios.get('/', { params });
  return data;
};
