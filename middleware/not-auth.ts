export default defineNuxtRouteMiddleware (async (to, from) => {
  console.log("inside not auth")
  const token = useCookie('token').value || "";
  console.log("tokkkkkkkkkkken",token)
  const { data, success }: any = await $fetch('/auth/verify-token', {
    method: "POST",
    body: JSON.stringify({
      token
    })
  })
  console.log(data,success,"ndiro result")

  if(success && data?.is_valid === true) return navigateTo('/')
})
