const fetcher = async (...args) => {
  const response = await fetch(...args);
  if (!response.ok) {
    const errorObject = await response.json();
    const error = new Error(errorObject.message);
    error.status = response.status;
    throw error;
  }
  return await response.json();
}

export default fetcher;
