function sumNumber(num) {
   let inp, outp;
   outp = 0;
   inp = num.toString();
   // console.log(typeof (inp));
   for (let i = 0; i < inp.length; i++) {
      
      outp += parseInt(inp[i]);
   }
   return outp;
}
// объект, содержащий в себе свойства энергетических профилей
const energyProfiles = {
   id: [0, 1, 2],
   name: ['low-energy', 'middle-energy', 'high-energy'],
   header: ['Низкий энергетический потенциал', 'Средний энергетический потенциал', 'Энергетический донор'],
   def: ['Число меньшее или равное 20 баллам указывает на то, что человеку от рождения дан низкий энергетический потенциал. Он склонен подсознательно «подзаряжаться» от окружающих, поскольку собственной энергии ему часто не хватает. У такого человека возможны проблемы со здоровьем и личной жизнью.', 'В интервал от 21 до 30 баллов попадают люди со средним энергетическим потенциалом. Они выстраивают сбалансированный энергообмен с окружающими, обладают уравновешенным характером, равномерно работоспособны, обладают хорошим здоровьем на протяжении жизни.', 'Свыше 30 баллов – это энергетический донор, способный получать энергию Вселенной, аккумулировать ее и при необходимости делиться ею с окружающими. Это прирожденный лидер, целитель, человек, обладающий экстрасенсорными способностями. Он никогда не остается в одиночестве, поскольку все чувствуют его мощную энергетику и подсознательно «питаются» ее избытком.']
};
// объект, содержащий свойства и описания типов личностей
const energyIdentity = {
   id: [0, 1, 2, 3],
   name: ['energyDonor', 'neutral', 'whiteMagic', 'blackMagic'],
   header: ['Энергодонор', 'Нейтрал', 'Белый маг', 'Черный маг'],
   def: ['Люди, черпающие ресурс из космоса. С ними всегда комфортно и легко.', 'Люди, которые не «качают» чужую энергию, но и своей не делятся. Это целеустремленные оптимисты, настроенные на решение собственных задач.', 'Белый маг, умет управлять своей энергией и расходует ее на благие цели.', 'Черный маг опасен, если занимается эзотерикой, поскольку тратит энергию на темные обряды. В обычной жизни ведет себя как нейтрал.']
}


let birthDate, p, outBirthDate, form, resBlock, outEnergyProf, outIdProfile, headerBlock;
let resEProfHdr, resEProfDef, resIProfHdr, resIProfDef;
let eProfile, iProfile;

headerBlock = document.querySelector('header');
form = document.querySelector('.form>form');
p = document.querySelectorAll('[class^="p"]');
resBlock = document.querySelector('.result');
outBirthDate = document.querySelector('.calculation-birthdate>span');
outEnergyProf = document.querySelector('.calculation-energy>span');
outIdProfile = document.querySelector('.calculation-identity>span');
resEProfHdr = document.querySelector('.energy-header>span');
resEProfDef = document.querySelector('.energy-description');
resIProfHdr = document.querySelector('.identity-header>span');
resIProfDef = document.querySelector('.identity-description');
// console.log(form.birthdate);

form.birthdate.addEventListener('blur', function () {
   birthDate = form.birthdate.value;

   // console.log(birthDate);

   
   // console.log(p.length);
   (function () {
    //body
      console.log(p);
      let j = 4;
      let timer = setInterval(function() {
         j--;
         if (j === 3) {
            p[0].style.display = 'block';
         }
         if (j === 2) {
            p[1].style.display = 'block';
         }
         if (j === 1) {
            p[2].style.display = 'block';
         }
         if (j === 0) {
            for (let i = 0; i < p.length; i++) {
               p[i].style.display = 'none';
            }
            
            resBlock.style.display = 'block';
            headerBlock.style.margin = '10px';
            clearInterval(timer);
            outBirthDate.innerText = birthDate;
            calculate();
            
         }
      }, 1000);
      
   }());
   
   })

console.log('your date is: ' + birthDate);

// функция вычисления и вывода данных об энергетическом профиле  и типе личности человека по дате рождения
function calculate() {
   let k;
   eProfile = getEnergyProfile(birthDate); //расчет энергетического профиля
   outEnergyProf.innerText = eProfile; //заполнение данных об ЭП в html-разметке
   iProfile = sumNumber(eProfile).toString().length === 2 ? sumNumber(sumNumber(eProfile)) : sumNumber(eProfile); //расчет типа личности 
   outIdProfile.innerText = iProfile; //заполнение данных о типе личности в html-разметке
   console.log(energyProfiles.header[0]);
   if (eProfile <= 20) { //условие, при котором ЭП меньше или равно 20
      k = 0;
      resEProfHdr.innerText = energyProfiles.header[k];
      resEProfDef.innerText = energyProfiles.def[k];
   } else if (eProfile > 20 && eProfile <= 30) { //условие, при котором ЭП больше 20, но меньше или равно 30
      k = 1;
      resEProfHdr.innerText = energyProfiles.header[k];
      resEProfDef.innerText = energyProfiles.def[k];
   } else if (eProfile > 30) {// условие, при котором ЭП больше 30
      k = 2;
      resEProfHdr.innerText = energyProfiles.header[k];
      resEProfDef.innerText = energyProfiles.def[k];
   }

   if (iProfile && (iProfile === 1 || iProfile === 2)) {
      k = 0;
      resIProfHdr.innerText = energyIdentity.header[k];
      resIProfDef.innerText = energyIdentity.def[k];
   } else if (iProfile && (iProfile === 5 || iProfile === 7)) {
      k = 0;
      resIProfHdr.innerText = energyIdentity.header[k];
      resIProfDef.innerText = energyIdentity.def[k];
   } else if (iProfile && (iProfile === 3 || iProfile === 6 || iProfile === 8)) {
      k = 1;
      resIProfHdr.innerText = energyIdentity.header[k];
      resIProfDef.innerText = energyIdentity.def[k];
   } else if (iProfile && iProfile === 9) {
      k = 2;
      resIProfHdr.innerText = energyIdentity.header[k];
      resIProfDef.innerText = energyIdentity.def[k];
   } else if (iProfile && iProfile === 4) {
      k = 3;
      resIProfHdr.innerText = energyIdentity.header[k];
      resIProfDef.innerText = energyIdentity.def[k];
   } else {
      alert ('ВЫ ВВЕЛИ НЕКОРРЕКТНЫЕ ДАННЫЕ! ПОВТОРИТЕ ВВОД ЕЩЕ РАЗ...');
   }
}

// функция вычисления энергетического профиля по вводимой дате рождения принимает в качестве аргумента "bDate" дату рождения; второй аргумент "eProfile" используется для вывода результатв вычислений за рамки функции
function getEnergyProfile(bDate) {
   let match, part1, part2, calc;
   let day = '', month = '', year = '';

   match = bDate.split('-');
   
   for (let i = 0; i < match.length; i++) {
      if (match[i].length === 4) {
         year = match[i];
         console.log("Год: "+year);
      }
      if (match[i].length !== 0 && match[i].length < 4 && match[i].length === 2) {
         if (i === 1) {
            month = match[i];
            console.log("Месяц: "+month);
         }
         if (i === 2) {
            day = match[i];
            console.log("День: " + day);
            console.log(typeof (day));
         }
      }
   }
   birthDate = day + '.' + month + '.' + year;
   part1 = parseInt(day + month);
   part2 = parseInt(year);
   calc = part1 * part2;
   eProfile = sumNumber(calc);
   
return eProfile
}

