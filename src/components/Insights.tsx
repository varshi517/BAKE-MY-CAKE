import React from "react";

export type InsightsProps = { mostPickedType: string; averagePickPrice: number; pickedCount: number; totalCount: number; pickPercentage: number; };

export default function Insights({ mostPickedType, averagePickPrice, pickedCount, totalCount, pickPercentage }: InsightsProps) {
  return (
<section className="insights-section" id="insights">
  <div className="section-heading">
    <p>YOUR BAKERY SNAPSHOT</p>
    <h2>Smart Insights</h2>
    <span>A quick look at what you have saved in My Picks.</span>
  </div>
  <div className="insights-grid">
    <div className="insight-card"><span>🏆</span><p>Most-picked type</p><strong>{mostPickedType}</strong></div>
    <div className="insight-card"><span>💰</span><p>Average pick price</p><strong>₹{averagePickPrice}</strong></div>
    <div className="insight-card"><span>♥</span><p>Picks vs catalog</p><strong>{pickedCount} / {totalCount}</strong><small>{pickPercentage}% of items saved</small></div>
  </div>
</section>


  );
}
