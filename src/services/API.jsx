import axios from 'axios';

export const fetchImages = async (value, page) => {
  const API_KEY = '36598390-cbdb1c2a048b1a21985e72a4d';
  const URL = `https://pixabay.com/api/?q=${value}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

  const { data } = await axios.get(URL);
  return data;
};
