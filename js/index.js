var memberName = document.getElementById('memberName');
var memberId = document.getElementById('memberId');
var memberAge = document.getElementById('memberAge');
var memberSection = document.getElementById('memberSection');
var notesMember = document.getElementById('notesMember');
var updateBtn = document.getElementById("updateBtn");
var AddBtn = document.getElementById("AddBtn");
var membersSide = document.getElementById("members-side");


var members = [];

// save data if reload
if(localStorage.getItem('membersLS') != null){
    members= JSON.parse( localStorage.getItem('membersLS'));
    membersSide.classList.replace("d-none","d-block");
    displayMembers(members);
}

function addmember()
{
    if(validateNameMember() === true){
    var member = 
    {
    nameMember:memberName.value,
    age:memberAge.value,
    id: memberId.value,
    Section: memberSection.value,
    notes:notesMember.value
    }
    members.push(member);
    localStorage.setItem('membersLS' , JSON.stringify(members));
    displayMembers(members);
    clearForm();
    
    }
    else{
        alert("not matched");
    }
}

function clearForm(){
    memberName.value="";
    memberId.value="";
    memberAge.value="";
    memberSection.value="";
    notesMember.value="";
}


// display members data
function displayMembers(arr){
    var membersContainer=``;
    for (var i=0 ; i<arr.length;i++){
        membersContainer+=`
        <tr>
            <td>${arr[i].nameMember}</td>
            <td>${arr[i].id}</td>
            <td>${arr[i].age}</td>
            <td>${arr[i].Section}</td>
            <td>${arr[i].notes}</td>
            <td><button onclick=" clearFormUpdate(${i}); " class="btn btn-outline-warning"><i class="fa-solid fa-edit"></i></button></td>
            <td><button onclick="deleteMember(${i});" class="btn btn-outline-danger"><i class="fa-solid fa-trash"></i></button></td>
        </tr>
        `;
    }
    hideIfNull();
    document.getElementById("body-table").innerHTML=membersContainer;
}


function deleteMember(dMember){
    members.splice(dMember,1);
    localStorage.setItem('membersLS' , JSON.stringify(members));
    displayMembers(members);
    hideIfNull();
}


function searchMembers(word){
    var matchedmembers=``;
    for(var i=0 ;i<members.length;i++){
        if(members[i].nameMember.toLowerCase().includes(word.toLowerCase()) === true){
            matchedmembers+=`
            <tr>
                <td>${members[i].nameMember}</td>
                <td>${members[i].id}</td>
                <td>${members[i].age}</td>
                <td>${members[i].Section}</td>
                <td>${members[i].notes}</td>
                <td><button onclick=" clearFormUpdate(${i});" class="btn btn-outline-warning"><i class="fa-solid fa-edit"></i></button></td>
                <td><button onclick="deleteMember(${i});" class="btn btn-outline-danger"><i class="fa-solid fa-trash"></i></button></td>
            </tr>
            `;
        }
    }
    document.getElementById("body-table").innerHTML=matchedmembers;
}

var contIndex=0;
function clearFormUpdate(memberIndex){
    contIndex=memberIndex;
    updateBtn.classList.replace('d-none' , 'd-block')

    memberName.value   =members[memberIndex].nameMember;
    memberId.value     =members[memberIndex].id;
    memberAge.value    =members[memberIndex].age;
    memberSection.value =members[memberIndex].Section;
    notesMember.value  =members[memberIndex].notes;
    AddBtn.classList.add("d-block","d-none")
}

function updateMember(contIndex){

members[contIndex].nameMember =memberName.value  ;
members[contIndex].id=memberId.value    ;
members[contIndex].age=memberAge.value   ;
members[contIndex].Section=memberSection.value;
members[contIndex].notes=notesMember.value ;
displayMembers(members);
localStorage.setItem('membersLS' , JSON.stringify(members));
updateBtn.classList.replace('d-block' , 'd-none');
AddBtn.classList.replace("d-none","d-block")
clearForm();

}

function validateNameMember(){
    var regex= /^[A-Za-z]{3,8}$/;
    return regex.test(memberName.value);
}

function hideIfNull(){
    if(members[0]!=null){
        membersSide.classList.replace("d-none","d-block");
    }
    else{membersSide.classList.replace("d-block","d-none");}
}