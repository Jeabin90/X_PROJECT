const joinbutn= document.getElementById("joinbtn")
const  joinbutn1= document.getElementById("joinbtn1")
const login= document.getElementById('login')
const id=document.getElementById('id')
const ps=document.getElementById('ps')
const loginbox=document.getElementById('loginbox')
joinbutn.addEventListener('click',()=>{
    login.innerHTML=`
    <p>아이디 <input id='id1'></p>
    <p>이름: <input id='name'></p>
    <p>비밀번호: <input type="password" id='ps1'></p>
    <p>email: <input id='email'></p>
    <button id="joinbtn1">회원 가입</button>
    <button id="loginbox">로그인으로</button>`
})


login.addEventListener('click',async()=>{
    const id=id.value.trim()
    const ps=ps.value.trim()
    if(!id||!ps){
        alert("아이디 또는 비밈번호 확인해주세요")
        return
    }
    try{
        const response = await fetch("/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id,ps})
        })
    }catch(error){
        console.log("메모 추가 실패: ", error)
    }
})