
export default defineNuxtRouteMiddleware (async (to, from) => {
  const token = useCookie('token').value || ""
  
  const { data, success }: any = await $fetch('/auth/verify-token', {
    method: "POST",
    body: JSON.stringify({
      token
    })
  })
  console.log(success,data?.is_valid)
  if(!success || data?.is_valid === false) return navigateTo('/login')
})
