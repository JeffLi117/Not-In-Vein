// fetching myFunction inside a component and sending customParameter to it
const getData = async (customParameter) => {
    const res = await fetch('/api/myFunction', {
      method: 'post',
      headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      customParameter: customParameter
    })});
    const response = await res.json();
}