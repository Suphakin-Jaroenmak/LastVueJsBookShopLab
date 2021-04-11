<template>
<div class="file">
    <form v-on:submit.prevent enctype="multipart/form-data">
        <div class="fields">
            <input type="file" ref="file" v-on:change="onSelect" />
          
        </div>
        <div class="error text-danger">
            {{message}}
        </div>
    </form>
</div>
</template>

<script>
import axios from "axios";
export default {
    name: "UploadImage",
    data() {
        return {
            file: "",
            message: ""
        }
    },
    methods: {
        getFileName() {

            if (this.file !== "") {
                //Return File Name
                return this.file
                
            } else {
                return ""
            }

        },
        onSelect() {

            const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
            const file = this.$refs.file.files[0]

            if (!allowedTypes.includes(file.type)) {
                this.$refs.file.value = null
                this.file = ""
                this.message = "Filetype is wrong!!"
            } else if (file.size > 500000) {
                this.$refs.file.value = null
                this.file = ""
                this.message = 'Too large, max size allowed is 500kb'
            } else {
                this.file = file.name
                this.message = ""
            }

        },
        async UploadImage() {
            if (this.file !== "") {

                const file = this.$refs.file.files[0]
                const formData = new FormData()
                formData.append('file', file)
                try {
                     let accessToken= await localStorage.getItem('accessToken')
                    if (await accessToken){
                        await axios.post(this.$apiUrl + "upload", formData,{ headers: {"Authorization" : `bearer ${accessToken}`} })
                    }else{
                        this.$router.push('/login');
                    }
                } catch (err) {
                    console.log(err)
                    this.message = err.response.data.error
                }
            } else {
                console.log("file is blank")
            }
        }
    },

}
</script>

<style scoped>

</style>
