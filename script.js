let vaccinename = 'COVAXIN'
let pincode = '410218'
let vaccinationcenterdata = []
let starttime
let notifier_music=new Audio('./Notifier_Music.mp3')
setInterval(() => {
    timeplace = document.getElementById('time')
    time = Date()
    timeplace.innerHTML = time
}, 1000);

setInterval(() => {
    getVaccineNotification()
}, 1050)

async function getVaccineNotification() {
    vaccinationcenterdata = []
    let datetime = new Date()
    let date = datetime.getDate()
    let month = datetime.getMonth()
    let year = datetime.getFullYear()
    // console.log(pincode);
    try {
        let response = await fetch(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pincode}&date=${date}-${month+1}-${year}`)
        // console.log(response);
        let centerdata = await response.json()
        // console.log(centerdata);
        centerdata.centers.forEach(element => {
            // console.log(element);
            if (element.fee_type === 'Free') {
                // console.log(element.sessions);

                for (let i = 0; i < element.sessions.length; i++) {
                    let value = element.sessions[i];
                    // console.log(value);
                    console.log(value.available_capacity_dose1);
                    if (value.vaccine == vaccinename) {
                        if (value.available_capacity_dose1 > 0) {
                            console.log('available');
                            notifier_music.play()
                            vaccinationcenterdata.push(element)
                            break
                        } else {
                            console.log('not available');
                            // console.log(element)
                        }
                    }
                }
            }
            // element.sessions.forEach(value => {
            //     // console.log(value.vaccine);
            // });
            // }
        });
        let alert_container = document.getElementById('alert')
        // console.log(vaccinationcenterdata.length);
        if (vaccinationcenterdata.length > 0) {
            let vaccinationdataContainerdata = `
            <h1 style="background:aquamarine;color:#fff;width:50%;padding:10px;text-align:center;font-size:30px;">
                    Vaccine Is Available
                </h1>
            <div id="listofcenters">
            `
            vaccinationcenterdata.forEach((value, index) => {
                // console.log(value);
                vaccinationdataContainerdata = vaccinationdataContainerdata + `
                <div class="vaccinationplacecontainer">
                    <h1>${value.fee_type}</h1>
                    <h4>Center ID : ${value.center_id} </h4>
                    <h4>Center Name : ${value.name} </h4>
                    <h4>Address : ${value.address} , ${value.block_name} , ${value.district_name} , ${value.state_name} </h4>
                    <h4>Time Slot : ${value.from} to ${value.to}</h4>
                `
                value.sessions.forEach((value, index) => {
                    // console.log(value);
                    vaccinationdataContainerdata = vaccinationdataContainerdata + `
                    <div class="vaccineplace">
                        <h3>${value.vaccine}</h3>
                        <h5>Date : ${value.date} </h5>
                        <h5>Minimun Age Range : ${value.min_age_limit} </h5>
                        <div>
                            <span>Dose-1 : <span class="desecount"> ${value.available_capacity_dose1}</span> </span>
                            <span>Dose-2 : <span class="desecount"> ${value.available_capacity_dose2}</span> </span>
                        </div>
                    </div>
                    `
                })
                // vaccinationdataContainerdata=vaccinationdataContainerdata+`</div>`
                vaccinationdataContainerdata = vaccinationdataContainerdata + `</div>`
            })
            alert_container.innerHTML = vaccinationdataContainerdata + `</div>`
        } else {
            // getVaccineNotification()
            notifier_music.pause()
            alert_container.innerHTML = `
            <div class="notavailable">
            <h2>
            ⚡ Vaccine Is not Available at this Time ⚡
            </h2>
            <div class="lodercontainer">
            <div class="loader"></div>
            <span> Please Wait ...</span> 
            <span> We are Searching For ${vaccinename}. w.r.t ${pincode} </span>
            <span>We will Notify You When it will be available </span>
            </div>
            </div>
            `
        }
    } catch (error) {
        console.error(error);
    }
}

getVaccineNotification()

async function updatepincode(event) {
    // console.log(event);
    // console.log(event.target.value);
    if (event.target.value.length===6) {
        pincode = event.target.value
        await getVaccineNotification()
    } else {
        window.alert('भाई प्लीज 6 डिजिट का पिनकोड इंटर कर ना')
    }
}

async function updatevaccinename(event) {
    // console.log(event);
    // console.log(event.target.value);
    vaccinename = event.target.value
    await getVaccineNotification()
}


document.onkeydown = function (e) {
    if (e.keyCode == 123) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && (e.keyCode == 'I'.charCodeAt(0) || e.keyCode == 'i'.charCodeAt(0))) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && (e.keyCode == 'C'.charCodeAt(0) || e.keyCode == 'c'.charCodeAt(0))) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && (e.keyCode == 'J'.charCodeAt(0) || e.keyCode == 'j'.charCodeAt(0))) {
        return false;
    }
    if (e.ctrlKey && (e.keyCode == 'U'.charCodeAt(0) || e.keyCode == 'u'.charCodeAt(0))) {
        return false;
    }
    if (e.ctrlKey && (e.keyCode == 'S'.charCodeAt(0) || e.keyCode == 's'.charCodeAt(0))) {
        return false;
    }
    if (e.ctrlKey) {
        return false
    }
}