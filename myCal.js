    //显示区数字过多，缩小字体
    function changeSize(show,cur_val){
        if(cur_val.length < 12)
            show.style.fontSize="60px";
        else if(cur_val.length >= 10)
            show.style.fontSize="30px";
        //else if(cur_val.length >= 25)
    }
    //清0
    function ac(){
        console.log("进入ac()");
        changeSize(show,"1");
        document.getElementById("show").innerHTML = 0;
    }
    //正负号切换
    function toggle(){
        console.log("进入toggle()");
        let show = document.getElementById("show");
        let cur_val = show.innerHTML;
        console.log(cur_val + " " + cur_val[0]);
        if(cur_val[0] === "-") {
            if(cur_val[1] === "0" && cur_val.length >= 3)
                cur_val = "-" + cur_val.substr(2);
            else
                cur_val = cur_val.substr(1);
        }
        else
            cur_val = "-" + cur_val;
        changeSize(show,cur_val);
        show.innerHTML = cur_val;
        console.log(show.innerHTML);
    }
    //百分号
    function percent(){
        console.log("进入percent()");
        let show = document.getElementById("show");
        let cur_val = show.innerHTML;
        if(cur_val === 0)
            cur_val= 0;
        else
            cur_val = cur_val / 100;
        changeSize(show,cur_val);
        show.innerHTML = cur_val;
        console.log(show.innerHTML);
    }

    //操作符 + .
    function op(op){
        console.log("进入op("+op+")");
        let show = document.getElementById("show");
        let cur_val = show.innerHTML;
        let last = cur_val.charAt(cur_val.length - 1);
        if(last === "*" || last === "/"
            || last === "+" || last === "-" || last === ".")
            ;
        else if(op === "."){
            if(cur_val.indexOf(".") === -1) //不包含.
                cur_val = cur_val + op;
            else {//包含.，但是中间有其他操作符分割，可以继续输入.
                let nums = cur_val.split(/[\+\-\*\/]/);
                if(nums[nums.length-1].indexOf(".")===-1){
                    cur_val = cur_val + op;
                }
            }
        }
        else
            cur_val = cur_val + op;
        changeSize(show,cur_val);
        show.innerHTML = cur_val;
        console.log(show.innerHTML);
    }
    //数字函数
    function num(n){
        console.log("进入num("+n+")");
        let show = document.getElementById("show");
        let cur_val = show.innerHTML;
        if (cur_val == "NaN") {
            show.innerHTML = "";
            cur_val = "";
        }
        if(cur_val === "0")
            cur_val = n;
        else
            cur_val = cur_val + n;
        changeSize(show,cur_val);
        show.innerHTML = cur_val;
        console.log(show.innerHTML);
    }
    // = 计算
    function cal(){
        console.log("进入cal()");
        let show = document.getElementById("show");
        let cur_val = show.innerHTML;
        let res = eval(cur_val);
        changeSize(show,cur_val);
        show.innerHTML = res;
        console.log(show.innerHTML);
    }

    document.onkeydown =function(event){
        let code = event.keyCode;
        console.log(code);

        if(code === 8 || code === 46)//AC
            ac();

        if(code === 13)//Enter =
            cal();

        let number = code - 48;
        if(48 <= code && code<= 57){
            if(event.shiftKey && code === 53)// shift + 5 + %
                percent();
            else if(event.shiftKey && code === 56)// shift+8=*
                op("*");
            else
                num(number);
        }

        number =  code - 96;//数字小键盘
        if(96 <= code && code<= 105){
            num(number);
        }

        //数字小键盘的op和Enter
        let keyVal = {106:"*",107:"+",108:"=",109:"-",110:".",111:"/"};
        if(106<= code && code<=111){
            if(code===108)
                cal();
            else
                op(keyVal[code]);
        }

        if(code === 187) {//=+
            if(event.shiftKey)
                op("+");
            else
                cal();
        }

        if(code === 189) // -_
            op("-");
        if(code === 191)// ? /
            op("/");
    }

    for(let i=0;i<1;i++){        
        //给 0 加 onclick事件
        let button0 = ["0","01"];
        for(let j = 0;j<button0.length;j++){
            document.getElementById(button0[j]).addEventListener("click",function(){
                num(0);
            });
        }
        //给 = 加 onclick事件
        let buttonEqual = "=";
        document.getElementById(buttonEqual).addEventListener("click",function(){
            cal();
        });
        //给 功能键 加 onclick事件
        let operatorBtns = {"ac":ac,"toggle":toggle,"percent":percent};
        for(let key in operatorBtns){
            document.getElementById(key).addEventListener("click",function(){
                // console.log(key+"  "+operatorBtns[key]);
                operatorBtns[key]();
            });
        }
        //给 运算符 加 onclick事件
        let operatorBtnRights = ["/","*","-","+","."];
        for(let j=0;j<operatorBtnRights.length;j++){
            document.getElementById(operatorBtnRights[j]).addEventListener("click",function(){
                op(operatorBtnRights[j]);
            });
        }  
        //给 数字 加 onclick事件
        let buttonNum = ["1","2","3","4","5","6","7","8","9"];
        for(let j = 0;j<buttonNum.length;j++){
            document.getElementById(buttonNum[j]).addEventListener("click",function(){
                num(buttonNum[j]);
            });
        } 

    }
