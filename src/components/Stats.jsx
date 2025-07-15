import React, { useEffect } from "react";
import "./Stats.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const statsData = [
  {
    icon: "bi-broadcast-pin",
    color: "#198754",
    target: 150,
    label: "Active Members",
    img: "activemembers.webp",
  },
  {
    icon: "bi-megaphone-fill",
    color: "#fd7e14",
    target: 15,
    label: "Events Organised",
    img: "events.webp",
  },
  {
    icon: "bi-people",
    color: "#0d6efd",
    target: 3000,
    label: "Attendee Count",
    img: "attendees.webp",
  },
  {
    icon: "bi-gender-female",
    color: "#d63384",
    target: 40,
    label: "WIE Members",
    img: "wie.webp",
  },
];

const Stats = () => {
  useEffect(() => {
    const counters = document.querySelectorAll(".count");
    const duration = 7000;
    const interval = 20;
    const steps = Math.ceil(duration / interval);

    function animateCounter(counter) {
      const target = +counter.getAttribute("data-target");
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current < target) {
          counter.innerText = Math.ceil(current);
        } else {
          counter.innerText = `${target}+`;
          clearInterval(timer);
        }
      }, interval);
    }

    function startAllCountersTogether() {
      counters.forEach((counter) => {
        counter.innerText = "0";
        animateCounter(counter);
      });
    }

    let started = false;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            started = true;
            startAllCountersTogether();
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((counter) => observer.observe(counter));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="stats-container">
      <div className="card__container">
        {statsData.map((stat, index) => (
          <article className="card__article" key={index}>
            <div className="card">
              <i
                className={`bi ${stat.icon}`}
                style={{ fontSize: "2.5rem", color: stat.color }}
              ></i>
              <div
                className="number count"
                data-target={stat.target}
              >
                0
              </div>
              <div className="label">{stat.label}</div>
            </div>
            <img
              src={`/img/${stat.img}`}
              alt={stat.label}
              className="card__bg"
              loading="lazy"
            />

          </article>
        ))}
      </div>
    </div>
  );
};

export default Stats;
