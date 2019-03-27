import './index.scss';

import VueCropper from 'vue-cropperjs';

export default {
  name: 'cropper',
  data () {
    return {
      imgSrc      : '',
      fileSelected: false,
      isLoading   : false,
      lastImg     : '',
      filename    : '',
      newImgUrl   : ''
    };
  },
  props: {
    cropImg: {
      default: ''
    },
    cropAlt: {
      default: ''
    },
    cropType: {
      default: ''
    }
  },
  mounted () {
    this.lastImg = this.imgSrc;
  },
  watch: {
    cropImg (val) {
      this.newImgUrl = val;
    }
  },
  components: {
    VueCropper
  },
  methods: {
    cancel () {
      this.fileSelected     = false;
      this.imgSrc           = this.lastImg;
      this.$refs.file.value = '';
    },

    setImage (e) {
      const file = e.target.files[0];

      if (!file.type.includes('image/')) {
        this.$toast('Please select an image file');
        return;
      }

      if ('function' === typeof FileReader) {
        const reader = new FileReader();
        reader.onload = (event) => {
          this.fileSelected = true;
          this.imgSrc  = event.target.result;
          this.$refs.cropper.replace(event.target.result);
        };
        reader.readAsDataURL(file);
      }
      else {
        this.$toast('Sorry, FileReader API not supported');
      }
    },

    upload () {
      let self = this;

      if (false === self.isLoading) {
        self.$store.get.dispatch({
          type: 'Loading',
          Text: '上传中...',
          isShow: true
        });

        self.isLoading = true;

        let data = {
          img: self.$refs.cropper.getCroppedCanvas({
            width: 300,
            height: 300
          }).toDataURL() || '',
          type: self.cropType
        };

        self.axios.post('/index/v100/Index/uploadImage', data)
        .then((res) => {
          if ('success' === res.state) {
            self.newImgUrl  = res.data.url;
            self.filename   = res.data.filename;
            self.$store.get.dispatch({
              type  : 'getImgUrl',
              images: {
                url     : self.newImgUrl,
                filename: self.filename
              }
            });
          }
          self.cancel();

          self.$store.get.dispatch({
            type: 'Loading',
            isShow: false
          });
          self.isLoading = false;

        });
      }

    },

    rotate () {
      this.$refs.cropper.rotate(90);
    }
  }
};