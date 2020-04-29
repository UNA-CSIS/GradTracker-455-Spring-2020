<template>
  <v-app>
    <v-container class="">
      <v-row>
        <v-col cols="">
          <v-card class="justify-center">
            <v-row>
              <v-card-text>
                <p class="headline">Setup Requirements</p>
                <div class="title font-weight-regular text--primary">
                  <ul>
                    <li>
                      Nodejs ecosystem - Javascript runtime built on Chrome's V8
                      Javascript engine
                    </li>
                    <li>
                      NPM - popular Javascript package manager / software
                      registry (yarn is another popular package manager)
                    </li>
                    <li>
                      Available for Linux, Windows, and Mac - Installation for
                      current versions on Linux available at
                      <a href="https://github.com/nodesource/distributions"
                        >NodeSource</a
                      >
                    </li>
                  </ul>
                </div>
              </v-card-text>

              <v-card-text>
                <p class="headline">
                  Install Nodejs and NPM on Ubuntu / Debian
                </p>
                <div>
                  <pre>
                <prism language="markup">
# Using Ubuntu
curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash - 
sudo apt-get install -y nodejs 

# Using Debian, as root
curl -sL https://deb.nodesource.com/setup_13.x | bash - 
apt-get install -y nodejs
                </prism>
                </pre>
                </div>
              </v-card-text>
              <v-card-text>
                <p class="headline">Install Vue CLI and Create Vue Project</p>
                <!--div class="title font-weight-regular text--primary"-->

                <div>
                  <pre>
<prism>
# Install Vue CLI  
npm install -g @vue/cli

# Start a new Project
vue create my-vue-app

# During setup select preferences


# Change directory
cd my-vue-app 

# Run Vue app 
npm run serve
</prism>
</pre>
                </div>
              </v-card-text>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script></script>

<style lang="scss" scoped>
pre:not(:last-of-type) {
  margin-bottom: 2rem;
}
</style>
