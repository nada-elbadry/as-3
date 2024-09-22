var siteName = document.getElementById("siteName"); // input kolo

var siteUrl = document.getElementById("siteUrl");

var allSites = [];

if (localStorage.getItem("sites") !== null) {
  allSites = JSON.parse(localStorage.getItem("sites"));
  displayData();
}

function addWebsite() {

  if (allValidation(siteName , 'msgName')  &&  allValidation(siteUrl , 'msgUrl')) {
    var website = {
      name: siteName.value,
      url: siteUrl.value,
    };
  
    allSites.push(website);
    localStorage.setItem("sites", JSON.stringify(allSites));
    displayData();
    clearForm();
    console.log(allSites);
  } else{
    alert('bt3ml eh yaam')
  }



}

function clearForm() {
  siteName.value = "";
  siteUrl.value = "";


  siteName.classList.remove('is-valid');
  siteUrl.classList.remove('is-valid');
}

function displayData() {
  var cartona = "";

  for (var i = 0; i < allSites.length; i++) {
    cartona += `
    <tr>
    <td>${i}</td>
    <td>${allSites[i].name}</td>
    <td> <button onclick="visitSite(${i})" class="btn btn-outline-success btn-sm">Visit</button> </td>
    <td> <button  onclick="deleteSite(${i})" class="btn btn-outline-danger btn-sm">Delete</button> </td>
    </tr>
    `;
  }

  document.getElementById("tableData").innerHTML = cartona;
}

function deleteSite(index) {
  console.log(index);
  allSites.splice(index, 1);
  displayData();
  localStorage.setItem("sites", JSON.stringify(allSites));
}

function visitSite(index) {
  window.open(allSites[index].url, "_blank");
}

function allValidation(element, msgId) {
  var msg = document.getElementById(msgId);
  var regex = {
    siteName: /^[A-Z][a-z]{3,8}$/,
    siteUrl:
      /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm,
  };

  if (regex[element.id].test(element.value) == true) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    msg.classList.add("d-none");

    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    msg.classList.remove("d-none");
    return false;
  }
}
