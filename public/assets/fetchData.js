export async function fetchData() {
  try {
    const response = await fetch('/data.json');
    if (!response.ok) {
      throw new Error('error network');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error', error);
    return null;
  }
}

export async function fetchPictures() {
  try {
    const response = await fetch('/pictures.json');
    if (!response.ok) {
      throw new Error('error network');
    }
    const pictures = await response.json();
    console.log(pictures);
    return pictures;
  } catch (error) {
    console.error('Error', error);
    return null;
  }
}
