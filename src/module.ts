import { PanelPlugin } from '@grafana/data';
import { SimplePanel } from './components/SimplePanel';
import { SimpleOptions } from './types';

export const plugin = new PanelPlugin<SimpleOptions>(SimplePanel).setPanelOptions(builder => {
  return builder
    .addSelect({
      path: 'chartType',
      name: 'Chart Type',
      defaultValue: 'circle',
      settings: {
        options: [
          { value: 'circle', label: 'Circle' },
          { value: 'bar', label: 'Bar' },
          { value: 'line', label: 'Line' },
        ],
      },
    })
    .addColorPicker({
      path: 'chartColor',
      name: 'Chart Color',
      defaultValue: '#3b82f6',
    })
    .addTextInput({
      path: 'chartLabel',
      name: 'Chart Label',
      defaultValue: 'My Custom Chart',
    });
});
