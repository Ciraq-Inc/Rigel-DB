<template>
  <div>
    <div :class="['sidebar', { active: isSidebarActive }]" @mouseenter="isSidebarActive = true"
      @mouseleave="isSidebarActive = false">
      <div class="top">
        <div class="logo">
          <nuxt-link to="/company">
            <img src="../assets/images/rigellogo.png" class="rlogo" />
          </nuxt-link>
          <span class="rName">Rigel OS</span>
        </div>

        <nuxt-link to="/company">
          <img src="../assets/images/rigellogo.png" id="btn" />
        </nuxt-link>
      </div>

      <div class="userRoleContainer">
        <ul v-for="(role, index) in allRoles" :key="index">
          <li>
            <nuxt-link :to="role.address" :class="{'nav-link': true, active: role.address === selectedRoleAddress,}" 
              @click="selectedRoleAddress = role.address">
              <div class="role-wrapper">
                <i class="icon" :class="getRoleIconClass(role.name)"></i>
                <span class="iconName">{{ (role.name) }}</span>
              </div>
              <span class="tooltip">{{ role.name }}</span>
            </nuxt-link>
          </li>
        </ul>
      </div>

      <ul class="logoutItem">
        <li>
          <nuxt-link to="/" :class="{'nav-link': true,}">
            <div class="role-wrapper">
              <i class="icon bx bx-user-circle"></i>
              <span class="iconName">Profile</span>
            </div>
          </nuxt-link>
        </li>
      </ul>
      
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal43"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div
          class="modal-content"
          style="margin-left: 170px; padding: 2rem; border-radius: 1rem"
        >
          <div class="modal-body" style="border-radius: 1rem">
            <div
              class="d-flex"
              style="justify-content: center; margin-bottom: 0.5rem"
            >
              <i
                class="bx bx-error-circle"
                style="font-size: 4rem; color: hsl(331, 100%, 50%)"
              ></i>
            </div>
            <div>
              <h5 style="text-align: center">
                <span style="font-weight: bold">Andrew</span> <br />
                Are you sure you want to log out?
              </h5>
            </div>
            <div
              class="d-flex"
              style="margin-top: 1rem; justify-content: center"
            >
              <div style="width: 50%">
                <button
                  style="width: 90%; padding: 0.3rem"
                  type="button"
                  @click="runLogout"
                  class="btn btn-danger text-white"
                >
                  Yes
                </button>
              </div>
              <div style="width: 50%">
                <button
                  style="width: 90%; padding: 0.3rem"
                  type="button"
                  data-bs-dismiss="modal"
                  class="btn btn-secondary text-white"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- NAVBAR BEGINS-->
    <div class="main-content">
      <div>
        <div class="navBar card">
          <div style="display: flex; justify-content: space-between">
            <div>
              <h6 class="bold">NEW DISCOVERY PHARMACY</h6>
              <h6>NII AWOSHIKA ST.-TABORA</h6>
            </div>
            <div>
              <h6 class="bold" style="text-align: center">
                {{ currentTime }} &nbsp; {{ currentDate }}
              </h6>
              <p style="text-align: right; margin-right: 1rem; font-size: 11px">
                &nbsp; Server IP : {{ ip }} Server Name:&nbsp;{{ host }}
              </p>
            </div>
            <div style="display: flex">
              <img style="margin-right: 20px" src="../assets/images/Iman Gadzhi.jpg" class="user-img2" />
              <div>
                <h6 class="bold">Welcome Andrew</h6>
                <p>ADMIN</p>
              </div>
              <!-- ========= log out ====== -->
              <div>
                <i class="bx bx-log-out userLogOut2" data-bs-toggle="modal" data-bs-target="#exampleModal43"></i>
              </div>
            </div>
          </div>
        </div>
        <nuxt />
      </div>
    </div>
    <!-- NAVBAR ENDS -->

  </div>
</template>
<script>
import "boxicons/css/boxicons.min.css";
export default {
  data() {
    return {
      currentTime: "",
      currentDate: "",
      isSidebarActive: false,
      selectedRoleTag: "",
      selectedRoleAddress: "",
      ip: "172.31.87.122",
      host: "EC2AMAZ-7ND18HK",
      allRoles: [
        {
          name: "Company",
          address: "/company",
        },
        {
          name: "Server",
          address: "/server",
        },
        {
          name: "Database",
          address: "/database",
        },
        {
          name: "Master List",
          address: "/masterlist",
        },
        {
          name: "Version Monitor",
          address: "/versionmonitor",
        },
        {
          name: "Settings",
          address: "/settings",
        },
        {
          name: "Suppliers",
          address: "/suppliers",
        },
        {
          name: "Manufacturer",
          address: "/manufacturer",
        },
      ],
      timermoniter: undefined,
    };
  },

  methods: {
    formatTime(date) {
      const hours12 = date.getHours() % 12 || 12;
      const minutes = date.getMinutes();
      const isAm = date.getHours() < 12;
      return `${hours12.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")} ${isAm ? "AM" : "PM"}`;
    },
    formatDate(date) {
      const DAYS = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const MONTHS = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      return `${DAYS[date.getDay()]}, ${MONTHS[date.getMonth()]
        } ${date.getDate()} ${date.getFullYear()}`;
    },
    updateTimeAndDate() {
      const now = new Date();
      console.log('Updating time and date:', now);
      this.currentTime = this.formatTime(now);
      this.currentDate = this.formatDate(now);
    },
    toggleSidebar() {
      this.isSidebarActive = !this.isSidebarActive;
      this.selectedRoleAddress = "";
    },

    async runLogout() {
      try {
        let response = await this.$axios.get(
          this.$store.state.urlBase + "logout"
        );
        console.log(response);

        if (response.data.sucessful == true) {
          console.log("Logged out");
          try {
            clearInterval(this.timermoniter);
          } catch (err) {}
          window.location.reload(true);
        } else {
          // console.log("LOGGED IN");
        }
      } catch (error) {
        this.error = error.message;
        console.log(error);
      }
      },

    getRoleIconClass(roleName) {
      switch (roleName) {
        case "Company":
          return "bx bxs-business";
        case "Server":
          return "bx bx-pie-chart-alt-2";
        case "Database":
          return "bx bx-analyse";
        case "Master List":
          return "bx bx-history";
        case "Version Monitor":
          return "bx bx-cube-alt";
        case "Settings":
          return "bx bx-cog";
        case "Suppliers":
          return "bx bxs-package";
        case "Manufacturer":
          return "bx bxs-factory";
        default:
          return "bx bxs-reset";
      }
    },

    // scrollToListItem() {
    //   const listItems = this.$refs.listItem;
    //   if (listItems && listItems.length > 0) {
    //     listItems[0].scrollIntoView({
    //       behavior: "smooth",
    //       block: "start",
    //     });
    //   }
    // },
  },

  mounted() {
    // this.scrollToListItem();
    this.updateTimeAndDate();
    this.timer = setInterval(() => {
      this.updateTimeAndDate();
    }, 30000);

    this.selectedRoleAddress = this.$route.path;
  },


  beforeDestroy() {
    clearInterval(this.timer);
  },

  watch: {
    '$route.path'(newPath) {
      this.selectedRoleAddress = newPath;
    }
  },
};
</script>


<style scoped>

* {
  margin: 0;
  padding: 0;
}

body {
  box-sizing: border-box;
  overflow-x: hidden;
}

.card {
  background-color: #fff;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  padding: 8px 15px;
  border-radius: 10px;
}

.navBar {
  margin-top: 0.4rem;
  margin-left: 0.8rem;
  margin-right: 0.8rem;
  z-index: 1;
}

.rlogo {
  width: 50px;
  height: 50px;
  border-radius: 100%;
  margin: 10px;
}

.rName {
  font-size: 20px;
}

.user.bottom {
  margin-top: auto;
}

.user-img {
  width: 50px;
  border-radius: 100%;
  border: 1px solid #eee;
}

.user-img2 {
  width: 30px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid #eee;
}

.sidebar ul li a.active {
  background-color: hsl(264, 39%, 51%);
  color: white;
}



.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 70px;
  background-color: #fff;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  padding: 0.4rem;
  transition: all 0.5s ease;
  display: flex;
  flex-direction: column;
  height: 100vh;
  z-index: 3;
}

.top {
  height: 8%;
}

.userRoleContainer {
  height: 95%;
  overflow-x: hidden;
  overflow-y: auto;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;
  margin-bottom: 20px;
}

.user {
  height: 8%;
  position: sticky;
  bottom: 0;
  display: flex;
  align-items: center;
  margin: 1rem 0;
}

.sidebar.active~.main-content {
  left: 250px;
  width: calc(100% - 250px);
}

.sidebar.active {
  width: 250px;
}

.sidebar #btn {
  position: absolute;
  top: 0.3rem;
  left: 50%;
  /* color: #12171e;
  font-size: 1.2rem;
  line-height: 50px; */
  height: 50px;
  width: 50px;
  transform: translateX(-50%);
  cursor: pointer;
}

.sidebar.active #btn {
  /* left: 90%; */
  display: none;
}

.sidebar .top .logo {
  color: #12171e;
  display: flex;
  height: 50px;
  width: 100%;
  align-items: center;
  pointer-events: none;
  opacity: 0;
}

.sidebar.active .top .logo {
  opacity: 1;
}

.top .logo i {
  font-size: 2rem;
  margin-right: 5px;
}

.user {
  display: flex;
  align-items: center;
  margin: 1rem 0;
}

.user p {
  color: #12171e;
  opacity: 1;
  margin-left: 1rem;
}

.bold {
  font-weight: 600;
}

.sidebar p {
  opacity: 0;
}

.sidebar.active p {
  opacity: 1;
}

.userLogOut {
  opacity: 0;
  margin-left: 20px;
  font-size: 30px;
  display: flex;
  justify-items: end;
  color: hsl(331, 100%, 50%);
}

.userLogOut2 {
  margin-left: 20px;
  font-size: 30px;
  display: flex;
  justify-items: end;
  color: hsl(331, 100%, 50%);
}

.sidebar.active .userLogOut {
  opacity: 1;
}

/* ===CHANGE THIS==== */
.sidebar ul li {
  position: relative;
  list-style-type: none;
  height: 50px;
  width: 90%;
  margin: 0.4rem auto;
  line-height: 30px;
}

.icon {
  font-size: 20px;
}

.icon:hover {
  background-color: hsl(264, 39%, 51%);
  color: #fff;
  width: 90%;
  font-size: 30px;
  align-items: flex-start;
}

.role-wrapper {
  display: flex;
  align-items: center;
}

.iconName {
  display: inline-block;
  vertical-align: middle;
  opacity: 0;
  margin-left: 10px;
}

.sidebar.active ul li a .iconName {
  opacity: 1;
  font-size: 15px;
}

.sidebar ul li a {
  width: 90%;
  color: hsl(264, 39%, 51%);
  display: flex;
  text-decoration: none;
  border-radius: 0.8rem;
}

.sidebar ul li a:hover {
  background-color: hsl(264, 39%, 51%);
  color: #fff;
  font-size: 25px;
}

.sidebar ul li a i {
  text-align: left;
  height: 50px;
  min-width: 50px;
  border-radius: 15px;
  line-height: 50px;
  padding-left: 10px;
}

.sidebar .nav-item {
  opacity: 0;
}

.sidebar.active .nav-item {
  opacity: 1;
}

.sidebar ul li .tooltip {
  background-color: #fff;
  position: absolute;
  left: 125px;
  top: 50%;
  transform: translate(-50%, -50%);
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 0.6rem;
  padding: 0.4rem 1.2rem;
  line-height: 1.8rem;
  opacity: 0;
}

.sidebar ul li:hover .tooltip {
  opacity: 1;
  color: hsl(264, 39%, 51%);
}

.sidebar.active ul li .tooltip {
  display: none;
}

.main-content {
  position: relative;
  height: 100vh;
  top: 0;
  left: 70px;
  transition: all 0.5s ease;
  width: calc(100% - 70px);
  /* background: rgba(254, 255, 255, 0.49);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(17.1px);
  -webkit-backdrop-filter: blur(17.1px); */
}
</style>
