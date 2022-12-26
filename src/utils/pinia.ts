import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
    const userId = ref('')
    const userName = ref('')
    const loggedin = ref(false)
    const login = (_userId: string, _userName: string) => {
        userId.value = _userId
        userName.value = _userName
        loggedin.value = true
    }
    const logout = () => {
        userId.value = ''
        userName.value = ''
        loggedin.value = false
    }
    return {
        login,
        logout,
        userId,
        userName,
        loggedin
    }
}) 