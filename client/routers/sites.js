/* DASHBOARDS */
Router.route('/', {
    name: 'sitesIndex',
    controller: SitesController,
});

Router.route('philosophy', {
    name: 'philosophyIndex',
    controller: PhilosophyController,
});

Router.route('work', {
    name: 'workIndex',
    controller: WorkController,
});


Router.route('contact', {
    name: 'contactIndex'
});

/* EOF DASHBOARDS */
