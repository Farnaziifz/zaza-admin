import LabelSettings from '/src/presentation/pages/LabelSettings.vue'
import LabelSettingsDegree from '/src/presentation/pages/LabelSettingsDegree.vue'
import LabelSettingsLabels from '/src/presentation/pages/LabelSettingsLabels.vue'

export const labelSettingsRouterConfig = {
  path: 'label-settings',
  name: 'LabelSettings',
  component: LabelSettings,
  redirect: '/label-settings/degree',
  children: [
    {
      path: 'degree',
      name: 'Degree',
      component: LabelSettingsDegree,
    },
    {
      path: 'label',
      name: 'Label',
      component: LabelSettingsLabels,
    },
  ],
}
