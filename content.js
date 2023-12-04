try {
  var obj = {};
  var att_tabs = [];

  const sall = () => {
    for (const sub of document.body.getElementsByClassName("subname")) {
      sub.checked = true;
    }
  };

  const desall = () => {
    for (const sub of document.body.getElementsByClassName("subname")) {
      sub.checked = false;
    }
  };

  const sub_pane = () => {
    // Create a div element
    var centeredElement = document.createElement("div");
    centeredElement.id = "centeredElement";

    // Set the content of the div
    centeredElement.style = `  
  margin : 260px 400px;
  width: 700px;
  height: 500px;
  background-color: rgb(51, 51, 51);
  text-align: left;
  position: fixed;
  visibility: hidden;
  top: 50%;
  left: 50%;
  overflow: auto;
  z-index: 999;
  color: rgb(255, 255, 255);
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 8px;
  transform: translate(-50%, -50%);
  top : 160px
  left : 450px`;

    centeredElement.innerHTML = `<div id="heading" style="text-align: center;
  font-size: 50px;
  color: #4CAF50;">Subjects</div>`;

    att_tabs.forEach((sub) => {
      sub = sub.parentElement.textContent.trim();
      let elem = document.createElement("div");
      elem.addEventListener("click", () => {
        elem.firstChild.checked = true;
      });
      elem.style.margin = "10px 0px";
      elem.style.fontSize = "17px";
      elem.style.display = "flex";
      elem.innerHTML = `<input style="margin : 5px" type="checkbox" class="subname" name="${sub}" id="${sub}">${sub}`;
      centeredElement.append(elem);
    });

    let buttonbox = document.createElement("div");
    buttonbox.id = "buttonbox";
    buttonbox.style = "text-align : center";
    buttonbox.innerHTML = `
  <button id="sall" style="    background-color: rgb(76, 175, 80);
  color: rgb(255, 255, 255);
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;" >Select All</button>
  <button id="desall" style="    background-color: rgb(76, 175, 80);
  color: rgb(255, 255, 255);
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;">Deselect All</button>`;
    centeredElement.append(buttonbox);

    let submit = document.createElement("div");
    submit.style = `display : flex;
  justify-content : center;
  margin : 10px 0px;
  `;
    submit.innerHTML = `<div style="
  width : 200px;
  text-align : center;
  background-color: rgb(76, 175, 80);
  color: rgb(255, 255, 255);
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;">Submit</div>`;
    submit.id = "sub_submit";
    centeredElement.append(submit);

    centeredElement.style.top = "160px";
    centeredElement.style.left = "450px";

    // centeredElement.style.overflow = "auto";
    // centeredElement.style.zIndex = "999";
    // // Append the div to the body
    document.body
      .getElementsByClassName("main-content")[0]
      .insertAdjacentElement("afterbegin", centeredElement);

    // Calculate the position to center the element
    // var leftPos = (window.innerWidth - centeredElement.clientWidth) / 2;
    // var topPos = (window.innerHeight - centeredElement.clientHeight) / 2;

    // // Set the position of the element
    // centeredElement.style.left = leftPos + "px";
    // centeredElement.style.top = topPos + "px";
  };

  const object_maker = (ssubs) => {
    obj = {};
    // console.log(att_tabs)
    // console.log(att_tabs[0].textContent)
    // console.log(ssubs)
    // console.log(ssubs[0].textContent)

    let ss_in_c = [];
    index = 0;

    for (const att_tab of att_tabs) {
      for (const i of ssubs) {
        if (att_tab.textContent === i.textContent) {
          ss_in_c.push(att_tab);
        }
      }
    }
    // console.log(ss_in_c);
    ss_in_c[index].click();
    index++;

    var in_num = setInterval(() => {
      // console.log(index)
      if (index == ss_in_c.length - 1) {
        clearInterval(in_num);
      }
      // console.log(ss_in_c[index]);
      ss_in_c[index].click();
      index++;
    }, 2000);
  };

  const EventListenerAdder = () => {
    var tabs = document.body.getElementsByTagName("a");

    var headings = [];

    for (const element of tabs) {
      try {
        if (element.role == "tab") {
          att_tabs.push(element);
          headings.push(element.textContent);
        }
      } catch {}
    }
    // console.log(att_tabs);

    for (const atab of att_tabs) {
      atab.addEventListener("click", () => {
        setTimeout(() => {
          count(atab.textContent);
        }, 1000);
      });
    }
  };

  const advice_maker = (b, d) => {
    let n = d - b;
    let advice;

    lec_to_be_attended = 0;
    bunk = -1;

    percentage = (n / d) * 100;

    // console.log(percentage);

    if (percentage == 75) {
      advice = "Cannot Miss The Next Class";
    } else if (percentage < 75) {
      while ((n / d) * 100 < 75) {
        n++;
        d++;
        lec_to_be_attended++;
      }
      // console.log(lec_to_be_attended, "attend Karo");
      advice = `Attend Next ${lec_to_be_attended} Classes`;
    } else if (percentage > 75) {
      while ((n / d) * 100 >= 75) {
        bunk++;
        d++;
      }
      if (bunk == 0) {
        // console.log("you cannot miss the agli class")
        advice = "Cannot Miss The Next Class";
      } else {
        // console.log(bunk, "lecture miss kr do");
        advice = `Can Skip Next ${bunk} Lectures`;
      }
    }

    // console.log(advice)
    return advice;
  };

  const count = (subject) => {
    let Ab = 0,
      Pr = 0;
    let arr = document.getElementsByTagName("td");
    for (const element of arr) {
      try {
        if (element.firstElementChild.textContent === "(A)") {
          Ab++;
        } else if (
          element.firstElementChild.textContent === "(P)" ||
          element.firstElementChild.textContent === "(O)"
        ) {
          Pr++;
        }
      } catch {}
    }
    // console.log("**************************************");
    // console.log(subject);
    // console.log("Total Lectures = ", Ab + Pr);
    // console.log("Total Presents = ", Pr);
    // console.log("Total Absents = ", Ab);
    // console.log("Percentage = ", (Pr / (Pr + Ab)) * 100);
    advice = advice_maker(Ab, Ab + Pr);
    // console.log(advice);
    let attobj = { TL: Ab + Pr, Pr: Pr, Ab: Ab, Advice: advice };
    obj[subject] = attobj;
    // console.log(obj);
  };

  const timer = (totaltime) => {
    let celem = document.getElementById("time");
    celem.textContent = totaltime;

    var i = totaltime - 1;
    var interval = setInterval(() => {
      if (i == 0 || totaltime == 0) {
        clearInterval(interval);
        // show_att();
      } else {
        document.getElementById("time").textContent = i;
      }
      i--;
    }, 1000);
  };

  const subject_Picker = () => {
    let selected_subject = [];
    let inputs = document
      .getElementById("centeredElement")
      .getElementsByTagName("input");
    console.log(inputs);
    for (const inpt of inputs) {
      if (inpt.checked == true) {
        selected_subject.push(inpt.parentElement);
      }
    }
    // console.log(selected_subject,"are selected elems");
    return selected_subject;
  };

  const navbarAdded = () => {
    document.body.getElementsByClassName("main-content")[0].style.padding = "0px";

    let style = document.createElement("style");
    style.innerHTML = `
.container {
  margin-top: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: #333;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.name {
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
}

.cta {
  padding: 10px 20px;
  font-size: 1rem;
  background-color: #4CAF50;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}`;
    document.head.append(style);

    let container = document.createElement("div");
    container.className = "container";
    container.id = "container"; 
    container.innerHTML = `<div style="font-size: 30px;" class="name"><img style='height : 30px;' src="https://img.freepik.com/premium-vector/new-twitter-logo-x-2023-twitter-x-logo-vector-download_691560-10794.jpg" alt="" srcset="" />&nbsp;:&nbsp;<a href="https://twitter.com/coder_yogesh">Coder_Yogesh</a></div>
<div style='font-size:15px' class="cta" id="cta">Calculate Attendance</div>`;

    document
      .getElementsByClassName("main-content")[0]
      .insertAdjacentElement("beforebegin", container);

    
  var btn = document.getElementById("cta")
  btn.addEventListener("click",()=>{
     btn.textContent = (btn.textContent == "Hide Menu") ? "Calculate Attendance" : "Hide Menu"
     document.getElementById("centeredElement").style.visibility =  (document.getElementById("centeredElement").style.visibility == "visible") ? "hidden" : "visible"

})

  };

  const att_show = (obj) => {
    let rstyle = document.createElement("style");
    rstyle.innerHTML = 
    
    `  #resultbox {
    display: flex;
    flex-direction: column;
    text-align: center;
    color: white;
    overflow: auto;

}

.result {
    margin: 10px;
    font-size: 20px;
    border: 5px solid black;
}

.subresult {
    margin: 5px;
    font-size: 25x;
}

#resultheading {
    margin: 20px 0px;
    color : white;
    font-size : 30px;
}

.Advice {
    font-size: 27px;
    margin: 10px 0px;
}

#subheading {
    font-size: 30px;
    text-align: center;
    margin: 10px 10px;
}`;
    document.head.append(rstyle);
    let celem = document.getElementById("centeredElement");
    celem.style.display = "flex";
    celem.style.flexDirection = "column";
    celem.innerHTML = `<div id="resultbox"></div>`;
    console.log(obj);
    for (const sub of Object.keys(obj)) {
      let sub_elem = document.createElement("div");
      sub_elem.style.width = "600px"
      sub_elem.setAttribute("class", "result");
      sub_elem.innerHTML = `<h3 id="resultheading">${sub}</h3>
        <p class="subresult total">Total Attendance: ${obj[sub]["TL"]}</p>
        <p class="subresult Pr">Attended Lectures: ${obj[sub]["Pr"]}</p>
        <p class="subresult Ab">Missed Lectures: ${obj[sub]["Ab"]}</p>
        <p class="subresult %">Percentage :  ${(
          (obj[sub]["Pr"] / obj[sub]["TL"]) *
          100
        ).toFixed(2)}</p>
        <p class="subresult Advice">${obj[sub]["Advice"]}</p>
        `;
      if ((obj[sub]["Pr"] / obj[sub]["TL"]) * 100 < 75) {
        sub_elem.style.background = "rgb(221, 70, 70)";
      } else {
        sub_elem.style.background = "rgb(81, 199, 81)";
      }
      document.getElementById("resultbox").append(sub_elem);
    }

    let cagain = document.createElement("div");
    cagain.style.display = "flex"
    cagain.style.justifyContent = "center"
    cagain.innerHTML = `<div style="
    width : 200px;
    text-align : center;
    background-color: rgb(76, 175, 80);
    color: rgb(255, 255, 255);
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 10px;">Calculate Again</>`;;
    cagain.setAttribute("id", "calc-again");
    document.getElementById("resultbox").append(cagain);
    document.getElementById("calc-again").addEventListener("click", () => {location.reload()});
  };

  console.log("Content Javascript Executed");
  navbarAdded();
  EventListenerAdder();
  sub_pane()
  
  


  document.getElementById("sall").addEventListener("click", sall);
  document.getElementById("desall").addEventListener("click", desall);
  document.getElementById("sub_submit").addEventListener("click", () => {
    console.log("clicked");
    // object_maker(subject_Picker());
    let sss = subject_Picker();
    console.log(sss);

    let a = document.getElementById("centeredElement");
    a.innerHTML = `<div id="time" style="font-size : 150px;">30</div>`;
    a.style.justifyContent = "center";
    a.style.alignItems = "center";
    a.style.display = "flex";

    timer(sss.length * 2);

    object_maker(sss);

    setTimeout(() => {
      att_show(obj);
    }, sss.length * 2 * 1000);
  });
} catch {}
