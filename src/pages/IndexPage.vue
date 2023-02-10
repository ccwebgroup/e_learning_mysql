<template>
  <q-page padding>
    <div style="max-width: 1000px;" class="q-mx-auto bg-white q-pa-sm rounded-borders">
      <q-card dark class="card-gradient">
        <div class="row justify-around">
          <div class="col-12 col-md-4">
            <q-img src="~assets/112194-mysql.gif" />
          </div>
          <div class="col-12 col-md-7 q-pa-sm">
            <div class="text-h4 text-bold">E-Learning in MySQL!</div>
            <div class="text-subtitle1 q-mt-md">
              <q-item-label>
                MySQL is a widely used relational database management system (RDBMS).
              </q-item-label>
              <q-item-label>MySQL is free and open-source.</q-item-label>
              <q-item-label>MySQL is ideal for both small and large applications.</q-item-label>
            </div>
            <q-card dark class="q-mt-md bg-primary">
              <q-card-section>
                MySQL is a database management system.

                It may be anything from a simple shopping list to a picture gallery or the vast amounts of information
                in a corporate network. To add, access, and process data stored in a computer database, you need a
                database management system such as MySQL Server.
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-card>

      <q-separator spaced />

      <div>
        <div class="text-h6">Why MySQL?</div>
        <div class="text-subtitle1">
          Many of the world's largest and fastest-growing organizations including Facebook, Twitter, Booking.com, and
          Verizon rely on MySQL to save time and money powering their high-volume Web sites, business-critical systems
          and packaged software.
        </div>

        <div class="text-subtitle1">
          Below you will find valuable resources including case studies and white papers that will help you implement
          cost-effective database solutions using MySQL.
        </div>
      </div>
    </div>
  </q-page>
</template>

<style lang="scss">
.card-gradient {
  background-image: linear-gradient(to right top, #f2fb1a, #f4d200, #eeab00, #e28400, #cf5f0a);
}
</style>

