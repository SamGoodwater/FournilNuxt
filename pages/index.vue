<template>
	<div v-if="loggedIn && user">
		<h1>Welcome {{ user }}!</h1>
		<p>Logged in since {{ session }}</p>
		<button @click="clear">Logout</button>
	</div>
	<div v-else>
		<h1>Not logged in</h1>
		<a href="/auth/github">Login with GitHub</a>
	</div>
</template>

<script setup>
	const { loggedIn, user, session, fetch, clear } = useUserSession()
</script>
