import React, { useMemo, useState } from 'react';
import { PanelProps, FieldType } from '@grafana/data';
import { SimpleOptions } from 'types';
import { css, cx } from '@emotion/css';
import { PanelDataErrorView } from '@grafana/runtime';

interface Props extends PanelProps<SimpleOptions> {}

export const SimplePanel: React.FC<Props> = ({ options, data, width, height, fieldConfig, id }) => {
  const [hovered, setHovered] = useState(false);
  const [pinned, setPinned] = useState(false);

  // ✅ Bonus: Real data + AI-ish insight
  const stats = useMemo(() => {
    const series = data.series?.[0];
    if (!series) return null;

    const numField = series.fields.find((f) => f.type === FieldType.number);
    if (!numField) return null;

    const values = (numField.values?.toArray?.() ?? []) as number[];
    const clean = values.filter((v) => typeof v === 'number' && !Number.isNaN(v));
    if (!clean.length) return null;

    let sum = 0;
    let min = clean[0];
    let max = clean[0];
    for (const v of clean) {
      sum += v;
      if (v < min) min = v;
      if (v > max) max = v;
    }

    const first = clean[0];
    const last = clean[clean.length - 1];
    const avg = sum / clean.length;

    const trend = last - first;
    const insight = trend > 0 ? 'Trend up 📈' : trend < 0 ? 'Trend down 📉' : 'Trend flat ➖';

    return { last, avg, min, max, insight };
  }, [data.series]);

  if (!data.series || data.series.length === 0) {
    return <PanelDataErrorView fieldConfig={fieldConfig} panelId={id} data={data} needsStringField />;
  }

  const chartType = options.chartType ?? 'circle';
  const chartColor = options.chartColor ?? '#3b82f6';
  const chartLabel = options.chartLabel ?? 'My Custom Chart';

  const showTooltip = hovered || pinned;

  return (
    <div
      className={cx(
        css`
          width: ${width}px;
          height: ${height}px;
          padding: 12px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          gap: 10px;
          overflow: hidden;
        `
      )}
    >
      {/* ✅ Mandatory */}
      <div className={css`font-size: 14px; opacity: 0.95;`}>
        Developed by <b>Yaren Dalkıran (MIS 233)</b>
      </div>

      {/* Başlık */}
      <div className={css`font-size: 18px; font-weight: 700;`}>
        {chartLabel}
      </div>

      {/* Info */}
      <div className={css`display: grid; grid-template-columns: 120px 1fr; row-gap: 6px; column-gap: 10px;`}>
        <div className={css`opacity:.85; font-weight:600;`}>Chart Type</div>
        <div className={css`opacity:.85;`}>{chartType}</div>

        <div className={css`opacity:.85; font-weight:600;`}>Chart Color</div>
        <div className={css`display:flex; align-items:center; gap:10px; opacity:.9;`}>
          <span style={{ width: 22, height: 14, background: chartColor, borderRadius: 3, display: 'inline-block' }} />
          <span>{chartColor}</span>
        </div>

        <div className={css`opacity:.85; font-weight:600;`}>Series</div>
        <div className={css`opacity:.85;`}>{data.series.length}</div>
      </div>

      {/* Chart area */}
      <div
        className={css`
          position: relative;
          flex: 1;
          min-height: 140px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.12);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        `}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setPinned((p) => !p)} // ✅ click interactivity (pin)
        title="Hover for summary • Click to pin/unpin"
      >
        {/* ✅ Responsive: viewBox 0..100 => kesilmez */}
        {chartType === 'circle' && (
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
            <circle cx="50" cy="50" r="22" fill={chartColor} opacity={0.92} />
          </svg>
        )}

        {chartType === 'bar' && (
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
            <rect x="32" y="28" width="36" height="50" rx="6" fill={chartColor} opacity={0.92} />
          </svg>
        )}

        {chartType === 'line' && (
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
            <polyline
              points="15,75 35,55 55,65 85,35"
              fill="none"
              stroke={chartColor}
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={0.95}
            />
          </svg>
        )}

        {/* ✅ Tooltip: sol-alt, daireyi kapatmaz */}
        {showTooltip && (
          <div
            className={css`
              position: absolute;
              bottom: 8px;
              left: 8px;
              padding: 8px 10px;
              background: rgba(0,0,0,0.55);
              border: 1px solid rgba(255,255,255,0.16);
              border-radius: 10px;
              font-size: 11px;
              width: 210px;
              pointer-events: none;
            `}
          >
            <div className={css`font-weight: 800; margin-bottom: 4px;`}>
              Query Summary {pinned ? '📌' : ''}
            </div>

            {!stats ? (
              <div>No numeric data</div>
            ) : (
              <>
                <div>Last: {stats.last.toFixed(2)}</div>
                <div>Avg: {stats.avg.toFixed(2)}</div>
                <div>Min: {stats.min.toFixed(2)}</div>
                <div>Max: {stats.max.toFixed(2)}</div>
                <div className={css`margin-top: 4px;`}>AI-ish: {stats.insight}</div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Alt satır: kısa özet */}
      <div className={css`opacity: 0.9; font-size: 13px;`}>
        {stats ? (
          <span>
            Last: <b>{stats.last.toFixed(2)}</b> • {stats.insight} • (Click chart to {pinned ? 'unpin' : 'pin'})
          </span>
        ) : (
          <span>Tip: TestData DB → Random Walk seç.</span>
        )}
      </div>
    </div>
  );
};
