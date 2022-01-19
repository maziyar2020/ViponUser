<template>
  <Navbar :text="navbarText" />
  <form class="main-section" @submit.prevent="formSubmit">
    <div class="dropzone-wrapper">
      <div class="dropzone">
        <div class="dropzone__logo" v-if="!imageCropped">
          <p>آپلود</p>
          <p>UPLOAD</p>
        </div>
        <img
          src=""
          alt=""
          ref="destination"
          class="destination"
          v-if="imageCropped"
        />
        <input
          type="file"
          ref="upload"
          @change="uploadImage"
          class="dropzone__input"
        />
      </div>
    </div>
    <button class="btn" type="submit">
      <p v-if="!formSubmitted">تایید</p>
      <div class="loader" v-if="formSubmitted">
        <div class="lds-ripple">
          <div></div>
          <div></div>
        </div>
      </div>
    </button>
  </form>
  <Footer />
  <!-- profile pick cropper modal -->
  <ImageCropper :isOpen="profileModal">
    <template v-slot:header>
      <div class="modal__btns">
        <button @click="profilePicModal('confirm')" class="confirm">
          تایید
        </button>
        <button @click="profilePicModal('cansel')">کنسل</button>
      </div>
    </template>
    <template v-slot:content>
      <div class="modal-outer">
        <div class="modal-inner">
          <div class="modal__content">
            <img src="" ref="img" />
          </div>
        </div>
      </div>
    </template>
  </ImageCropper>
  <div
    class="modal profile-modal"
    :class="[profileModal && 'modal--active']"
  ></div>
  <span
    class="backdrop"
    v-if="profileModal"
    @click.self="profilePicModal('cansel')"
  ></span>
</template>

<script>
import Navbar from "@common/Navbar.vue";
import ImageCropper from "@common/ImageCropper.vue";
import Footer from "@common/BaseFooter.vue";
import Cropper from "cropperjs";
import { postProfilePic } from "@api/ProfileServices/ProfileRequest";
// joi validation
import { requiredObject } from '@utils/JoiValidation.js'
import { schemaMaker } from '@utils/JoiValidation.js'
// joi validation

const schema = schemaMaker({
  image: requiredObject()
}) 
export default {
  name: "Upload",
  data() {
    return {
      navbarText: "آپلود تصویر",
      formSubmitted: false,
      imageCropped: false,
      image: {},
      destination: {},
      profileModal: false,
      prevImg: "",
      croppedImage: null,
      cropper: {},
      blob: null,
    };
  },
  components: {
    Navbar,
    Footer,
    ImageCropper,
  },
  methods: {
    validation() {
      // this method will valuate form based on schema rules
      const { error, value } = schema.validate(
        {
          image: this.blob,
        },
        { abortEarly: false }
      );
      // returning the errors and values whenever this method called
      return { error, value };
    },
    blobConvert() {
      // convert url to blob
      function dataURItoBlob(dataURI) {
        // convert base64 to raw binary data held in a string
        var byteString = atob(dataURI.split(",")[1]);

        // separate out the mime component
        var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

        // write the bytes of the string to an ArrayBuffer
        var arrayBuffer = new ArrayBuffer(byteString.length);
        var _ia = new Uint8Array(arrayBuffer);
        for (var i = 0; i < byteString.length; i++) {
          _ia[i] = byteString.charCodeAt(i);
        }

        var dataView = new DataView(arrayBuffer);
        var blob = new Blob([dataView.buffer], { type: mimeString });
        return blob;
      }
      this.blob = dataURItoBlob(this.$refs.destination.src);
    },
    async formSubmit() {
      if (!this.validation().error) {
        this.formSubmitted = true;
        const formData = new FormData();
        formData.append("image", this.validation().value.image, "image.jpg");

        await postProfilePic(formData, {
          "Content-Type": "multipart/form-data",
        }).then((Response) => {
          if (Response.status == 200) {
            const notification = {
              type: "success",
              message : Response.data.message
            };
            this.$store.dispatch("addNotification", notification);
            this.formSubmitted = false;
            this.$router.push({name : 'Home'})
          }
        })
      } else {
        const message = this.validation().error.message;
        const notification = {
          type: "error",
          message,
        };
        this.$store.dispatch("addNotification", notification);
      }
    },
    uploadImage(event) {
      // when user canceled the upload => dont do any thing
      if (
        event.target.files[0] !== undefined &&
        event.target.files[0].type.match("image.*")
      ) {
        this.imageCropped = true;
        this.profileModal = true;
        const selectedFile = event.target.files[0];
        const reader = new FileReader();
        this.image = this.$refs.img;

        reader.addEventListener("load", (event) => {
          this.image.src = event.target.result;

          this.cropper = new Cropper(this.image, {
            viewMode: 3,
            zoomable: false,
            scalable: false,
            aspectRatio: 1,
            checkOrientation: false,
            cropend: () => {
              const canvas = this.cropper.getCroppedCanvas();
              this.destination = canvas.toDataURL("image/png");
              this.croppedImage = this.destination;
            },
          });
        });

        reader.readAsDataURL(selectedFile);
      } else {
        const message = "لطفا فایل انتخابی عکس باشد";
        const notification = {
          type: "error",
          message,
        };
        this.$store.dispatch("addNotification", notification);
      }
    },
    profilePicModal(type) {
      switch (type) {
        case "confirm":
          this.$refs.destination.src = this.croppedImage;
          this.prevImg = this.croppedImage;
          this.profileModal = false;
          this.blobConvert();
          break;
        case "cansel":
          if (this.prevImg == "" && this.imageCropped == true) {
            this.profileModal = false;
            this.imageCropped = false;
          } else {
            this.$refs.destination.src = this.prevImg;
            this.profileModal = false;
          }
          break;

        default:
          break;
      }
      this.cropper.destroy();
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../node_modules/cropperjs/dist/cropper.min.css";
.main-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
.dropzone {
  border-radius: 50%;
  text-align: center;
  width: 150px;
  height: 150px;
  vertical-align: middle;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background-color: #ddd;
  cursor: pointer;
}
.dropzone-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.dropzone__input {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  cursor: pointer;
  opacity: 0;
  height: 200px;
  width: 200px;
}
.dropzone__logo {
  font-size: 25px;
  color: #fff;
}
.btn {
  width: 92%;
  background-color: #000;
  color: #fff;
  margin-bottom: 10px;
  height: 55px;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}
.loader {
  position: absolute;
  top: -8px;
  width: 40px;
  height: 40px;
  transform: translate(-20px);
}
/* form submit load */
.lds-ripple {
  display: inline-block;
  position: relative;
  width: 100%;
  height: 100%;
}
.lds-ripple div {
  position: absolute;
  border: 4px solid #fff;
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.lds-ripple div:nth-child(2) {
  animation-delay: -0.5s;
}
@keyframes lds-ripple {
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
}
// cropper
.destination {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
/* modal */
.backdrop {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  z-index: 200;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}

.modal__btns {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: transparent;
  height: 100%;
  .confirm {
    border-left: 1px solid rgba(255, 255, 255, 0.5);
  }
}
.modal__btns button {
  width: 50%;
  height: 100%;
  font-size: 20px;
  color: #fff;
  cursor: pointer;
  background-color: transparent;
}
.modal__content {
  margin: 0 auto;
  max-width: 420px;
  max-height: 620px;
  display: block;
  img {
    max-width: 100%;
  }
}
// toast
.toast-msg {
  position: fixed;
  bottom: 200px;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 200px;
  height: 40px;
  background-color: #ddd;
  z-index: 800;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  border-right: 4px solid #c69d4e;
  box-shadow: 0 0 20px 5px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  transform: translateY(900%);
}
.toast-msg--show {
  transform: translateY(0);
}
.modal-outer {
  max-height: 100%;
  overflow-y: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: calc(100% - 50px);
}
.modal-inner {
  overflow: hidden;
  width: 100%;
}
</style>