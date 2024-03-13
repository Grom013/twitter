export async function fetchData() {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const response = await fetch('/public/data.json');
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
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const response = await fetch('/public/pictures.json');
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
