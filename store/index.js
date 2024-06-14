// @@ -1,2005 +1,2023 @@
// import addbarcode from '~/static/addbarcode.js'
import axios from '@nuxtjs/axios'
// import common from 'common.js'


export const state = () => ({
  // urlBase: "http://192.168.100.37:8081/updateronline/",
  // urlBase: "/test/",
  urlBase: "http://auto.rigelos.com:8083/test/",

  // urlBase: "http://auto.rigelos.com:81/test/",
  dialoginfo: "",
  url:'',
  yesorNoClickFunc: { yesfunc: undefined, nofunc: undefined },
})


export const getters = {
  fetchData: (state)=>{
 
    try {
        let response =  this.$axios.get(
          // state.urlBase + process.env.NUXT_ENV_ADD_CUSTOMER,
          state.url
        );

        let data = response.data.sucessful;
        if (data === true) {
       return   response

        }
      } catch (err) {

        console.log(err)
        
      }
      return [];
  }

}

export const mutations = {
  async setURL(state, payload) {
  state.url=payload
  },
 
  async showWait(state, payload) {
    if (payload) {
      state.dialoginfo = payload
    }
    await $("#waitdailog").modal('show')

  },
  async closeWait(state, payload) {
    await setTimeout(() => {
      $("#waitdailog").modal('hide')
    }, 200);

  },
  async OpenYesOrNOClick(state, payload) {
    $("#yesorno").modal('show')
    // {backdrop: 'static', keyboard: false},
    state.yesorNoClickFunc = payload;
    // console.log(payload)
  },


  async YesOrNOClick(state, payload) {
    if (state.yesorNoClickFunc.yesfunc) {
      $("#yesorno").modal('hide')
      await state.yesorNoClickFunc.yesfunc()
    }
  },

  async YesOrNOCancelClick(state, payload) {
    // console.log("in cancel")
    if (state.yesorNoClickFunc.nofunc)
      await state.yesorNoClickFunc.nofunc()

  },
  
  async showMessage(state, payload) {
    state.dialoginfo = payload
    await $("#okdialog").modal('show')
    setTimeout(() => {
      $("#okdialog").modal('hide')
    }, 3000);
  },


  async showSimpleYesOrNo(state, payload) {
    let info = payload.info
    this.commit('changeDialog', info)
    let func = payload.func
    this.commit('OpenYesOrNOClick', func
    )

  },

  async showSimpleYesOrNo2(state, payload) {

    let page = this
    let axios = this.$axios
    let dat = {}
    dat.info = payload.info


    dat.func = {}
    dat.func.yesfunc = async function () {
      try {
        page.commit('changeDialog', "Please wait!")
        page.commit('showWait')
        try {
          payload.addfun(state, page, axios)
          setTimeout(() => {
            $("#waitdailog").modal('hide')


            setTimeout(() => {

              page.commit('showMessage', payload.message)
            }, 200);
          }, 500);
        }
        catch (error) {
          this.error = error.message;
          $("#waitdailog").modal('hide')
        }

      }
      catch (error) {
        console.log(error);
        this.error = error.message;
      }
    }
    this.commit('showSimpleYesOrNo', dat)

  },



  changeDialog(state, payload) {
    state.dialoginfo = payload
  },


}

export const actions = {
  //Fetch customers from API

} 
