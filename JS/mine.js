var buttonFun = document.querySelector("button");
buttonFun.addEventListener("click",addWebsite);
var submitBtn = document.getElementById("submit-btn");
var updateBtn = document.getElementById("update-btn");
var nameRgx = /^\w[a-zA-z]{3,}$/i;
var urlRgx = /^(https):\/\/[a-zA-Z0-9]{3,}(.com)$/;
var siteName = document.getElementById("input1");
var siteUrl = document.getElementById("input2");
var addSite;
var site = [];
var uIndex;
if(localStorage.getItem("siteData")!=null)
{
    site = JSON.parse(localStorage.getItem("siteData"));
    displayInputs(site);
}
function addWebsite()
{
    if(siteName.classList.contains("is-valid")&&siteUrl.classList.contains("is-valid"))
    {
        addSite = {siteName: siteName.value, 
        siteUrl: siteUrl.value};
        site.push(addSite);
        localStorage.setItem("siteData", JSON.stringify(site));
        clearInputs();
        siteName.classList.remove("is-valid");
        siteUrl.classList.remove("is-valid");
        displayInputs(site);
    }
}

function clearInputs()
{
    siteName: document.getElementById("input1").value = null;
    siteUrl: document.getElementById("input2").value = null;
}
function displayInputs(arr)
{
    var sites = "";
    for(var i = 0; i<arr.length; i++)
    {
        sites+=`<tr>
            <td class = "pt-3">`+(arr[i].index?arr[i].index:i+1)+`</td>
            <td class = "pt-3">`+(arr[i].newSiteName?arr[i].newSiteName:arr[i].siteName)+`</td>
            <td><a href="`+arr[i].siteUrl+`" class= "btn" target = "_blank"><i class="fa-solid fa-eye"></i> Visit</a></td>
            <td><button id = "deleteBtn" onclick = removeInput(`+(arr[i].index?arr[i].index:i)+`) class= "btn btn-danger"><i class="fa-solid fa-trash"></i> Delete</button></td>
            <td><button id = "updateBtn" onclick = setData(`+(arr[i].index?arr[i].index:i)+`) class= "btn btn-warning"><i class="fa-solid fa-pen"></i> Update</button></td>
            </tr>`
    }
    document.getElementById("tBody").innerHTML = sites;
}

function removeInput(wIndex)
{
    site.splice(wIndex, 1);
    localStorage.setItem("siteData",JSON.stringify(site));
    displayInputs(site);
}

siteName.addEventListener("input",function(){
    validate(siteName,nameRgx);
})
siteUrl.addEventListener("input",function(){
    validate(siteUrl,urlRgx);
})
function validate(element,regex)
{
    if(regex.test(element.value))
    {
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
        document.getElementById("submit-btn").removeAttribute("data-bs-toggle","modal");
        document.getElementById("submit-btn").removeAttribute("data-bs-target","#exampleModal");
        document.getElementById("update-btn").removeAttribute("data-bs-toggle","modal");
        document.getElementById("update-btn").removeAttribute("data-bs-target","#exampleModal");
    }
    else
    {
        element.classList.remove("is-valid");
        element.classList.add("is-invalid");
        document.getElementById("submit-btn").setAttribute("data-bs-toggle","modal");
        document.getElementById("submit-btn").setAttribute("data-bs-target","#exampleModal");
        document.getElementById("update-btn").setAttribute("data-bs-toggle","modal");
        document.getElementById("update-btn").setAttribute("data-bs-target","#exampleModal");
    }
}

function search(term)
{
   var newArray = [];
    for(var i =0;i<site.length;i++)
    {
        if(site[i].siteName.toLowerCase().includes(term.toLowerCase())){
            site[i].newSiteName=site[i].siteName.replace(term, "<span class = 'text-danger fw-bold'>"+term+"</span>")
            site[i].index = i;
            newArray.push(site[i]);
        }
    }
    displayInputs(newArray);
}

function setData(index)
{
    uIndex = index;
    siteName.value = site[uIndex].siteName;
    siteUrl.value = site[uIndex].siteUrl;
    updateBtn.classList.remove("d-none");
    submitBtn.classList.add("d-none");
}

updateBtn.addEventListener("click",function(){
    if(siteName.classList.contains("is-valid")&&siteUrl.classList.contains("is-valid"))
    {
        newSite = {siteName: siteName.value, 
            siteUrl: siteUrl.value};
        site.splice(uIndex,1,newSite);
        localStorage.setItem("siteData", JSON.stringify(site));
        clearInputs();
        submitBtn.classList.remove("d-none");
        updateBtn.classList.add("d-none");
        siteName.classList.remove("is-valid");
        siteUrl.classList.remove("is-valid");
        displayInputs(site);
    }
})