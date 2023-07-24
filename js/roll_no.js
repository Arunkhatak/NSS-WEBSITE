const setData = (data) => {
  const table = document.getElementById("dataTable");
  if (!data) {
    table.innerHTML = "";
    return
  }
  const heading = document.createElement("tr");
  const content = document.createElement("tr");
  Object.entries(data).forEach((value) => {
    const head = document.createElement("th");
    const body = document.createElement("td");
    head.textContent = value[0];
    body.textContent = value[1];
    heading.appendChild(head);
    content.appendChild(body);
  });
  table.appendChild(heading);
  table.appendChild(content);
};

const setError = (msg) => {
  document.getElementById("error").innerHTML = msg;
};

const getData = (roll_no) => {
  axios
    .get('api/hours.php', {
      params: {
        roll_no,
      },
    })
    .then((response) => {
      console.log(response.data);
      setLoading(false);
      setData(response.data.data);
    })
    .catch((error) => {
      console.error(error.response.data);
      setError(error.response.data.message);
      setLoading(false);
    });
};

const setLoading = (loading) => {
  const submitBtn = document.getElementById("submitButton");
  if (loading) {
    submitBtn.value = "Loading...";
    submitBtn.disabled = true;
  } else {
    submitBtn.value = "Submit";
    submitBtn.disabled = false;
  }
};

const submitHandler = (event) => {
  event.preventDefault();
  setError("");
  setData();
  setLoading(true);
  const roll_no = document.getElementById("primary_key").value;
  getData(roll_no);
};

const form = document.getElementById("rollNoForm");
form.addEventListener("submit", submitHandler);
