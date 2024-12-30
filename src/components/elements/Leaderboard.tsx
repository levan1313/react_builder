import React from "react";
import { LeaderboardElement } from "./ElementTypes";
import "./Leaderboard.css";

interface LeaderboardProps {
  element: LeaderboardElement;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ element }) => {
  const { title, data, textColor, backgroundColor } = element;

  return (
    <div
      className="leaderboard-container"
      style={{
        backgroundColor: backgroundColor || "#062733",
        color: textColor,
      }}
    >
      {/* Glowing Border */}
      <div className="glowing-border">
        {/* Leaderboard Header */}
        <div className="leaderboard-header">
          <h2 className="leaderboard-header__title">
            <img
              src="https://cdn-icons-png.flaticon.com/512/8348/8348232.png"
              alt="Leaderboard Icon"
              className="medal-icon"
            />
            {title}
          </h2>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="leaderboard-table-wrapper">
        <table className="leaderboard-table">
          <thead>
            <tr className="leaderboard-table__header">
              <th className="leaderboard-table__header-cell">Place</th>
              <th className="leaderboard-table__header-cell">Player</th>
              <th className="leaderboard-table__header-cell">Points</th>
              <th className="leaderboard-table__header-cell">Prize</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                className={`leaderboard-table__row ${
                  item.place <= 3 ? "highlight" : ""
                }`}
              >
                <td className="leaderboard-table__cell">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={`${item.place}st`}
                      className="medal-icon"
                    />
                  ) : (
                    item.place
                  )}
                </td>
                <td className="leaderboard-table__cell">{item.player}</td>
                <td className="leaderboard-table__cell">{item.points}</td>
                <td className="leaderboard-table__cell prize">
                  <span>{item.prize}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
