import React from "react";
import { FaUsers, FaHistory, FaHandshake } from "react-icons/fa";
import PageTitle from "../../components/PageTitle";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";

export default function AboutUs() {
  return (
    <div className="content-box my-5 bg-base-100 p-10 rounded-2xl">
      <PageTitle
        title={"About Us"}
        subtitle={
          "Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time."
        }
      ></PageTitle>

      <Tabs selectedTabClassName="tab-selected" className="custom-tabs">
        <TabList>
          <Tab>Story</Tab>
          <Tab>Mission</Tab>
          <Tab>Success</Tab>
          <Tab>Team & Others</Tab>
        </TabList>

        <TabPanel>
          <div className=" flex flex-col-reverse  lg:flex-row gap-5 mt-5">
            <div className="stories flex-2 space-y-10">
              <p>
                What started as a small idea among passionate problem-solvers
                has transformed into one of the most reliable logistics
                platforms in the country. Our journey began with the belief that
                parcel delivery could be smarter, more efficient, and
                customer-focused. Through consistent innovation and a dedication
                to solving real-world delivery challenges, we built a system
                that prioritizes transparency and convenience.
              </p>
              <p>
                From managing a handful of local deliveries to scaling our
                operations nationwide, our commitment has remained
                unchanged—every package, regardless of its size or destination,
                matters. We understand how important it is for businesses and
                individuals to send and receive parcels securely and on time.
                That’s why we focus on building technology-driven logistics
                infrastructure that is both affordable and dependable.
              </p>

              <p>
                Today, Zapshift serves thousands of happy customers across the
                country. We take pride in the trust we’ve earned, and we are
                more motivated than ever to redefine delivery standards and
                exceed expectations at every step. Our story is not just about
                logistics—it’s about making connections, empowering businesses,
                and delivering satisfaction.
              </p>
            </div>
            <div className="image flex-1">
              <img
                src="https://d23xypyp2dkdqm.cloudfront.net/wp-content/uploads/2022/01/31034059/woman-hand-accepting-delivery-boxes-from-deliveryman-1.jpg"
                alt="Zapshift delivery"
                className="h-full rounded-lg object-cover"
              />
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="grid gap-6  mt-5">
            {/* Who We Are */}
            <div className="mb-5">
              <div className="flex items-center mb-3">
                <FaUsers className="text-2xl text-secondary mr-2" />
                <h2 className="text-xl font-semibold">Who We Are</h2>
              </div>
              <div className="divider mt-5"></div>
              <p className="text-gray-700">
                Zapshift is a next-generation parcel delivery platform built to
                simplify and accelerate the logistics experience. We are a team
                of passionate professionals committed to reshaping last-mile
                delivery with the power of smart technology, real-time tracking,
                and human-centered service. Whether you're a business or an
                individual sender, we’re here to make delivery stress-free and
                seamless.
              </p>
            </div>

            {/* Our Promise */}
            <div className="mb-5">
              <div className="flex items-center mb-3">
                <FaHandshake className="text-2xl text-info mr-2" />
                <h2 className="text-xl font-semibold">Our Promise</h2>
              </div>
              <div className="divider mt-5"></div>
              <p className="text-gray-700">
                At Zapshift, we promise speed, transparency, and reliability in
                every shipment. Your trust is our priority — that’s why we
                ensure on-time delivery, clear communication, and secure
                handling of every parcel. Our tech-driven system and dedicated
                rider network are always ready to go the extra mile, ensuring
                your delivery reaches its destination safely and on schedule.
              </p>
            </div>

            {/* Our Journey */}
            <div className="mb-5">
              <div className="flex items-center mb-3">
                <FaHistory className="text-2xl text-secondary mr-2" />
                <h2 className="text-xl font-semibold">Our Journey</h2>
              </div>
              <div className="divider mt-5"></div>
              <p className="text-gray-700">
                Founded with a vision to transform logistics in Bangladesh,
                Zapshift began as a small startup with big dreams. Over time,
                we’ve grown into a trusted delivery partner, driven by
                innovation, feedback, and a relentless focus on user
                satisfaction. Every milestone we achieve reflects our journey
                toward building a smarter, faster, and more connected logistics
                future.
              </p>
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          {/* Success Panel */}
          <div className="mt-5 space-y-6">
            <h2 className="text-2xl font-bold text-secondary">
              Success Stories
            </h2>
            <p>
              Since its launch, Zapshift has consistently delivered high
              customer satisfaction, boasting a 98% on-time delivery rate. Our
              platform now supports thousands of users across the country, from
              individuals to large-scale businesses.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Over 1 million successful deliveries.</li>
              <li>
                Partnered with 500+ local and international eCommerce platforms.
              </li>
              <li>
                Recognized as a top startup in the logistics sector (2024).
              </li>
            </ul>
            <p>
              Our success is driven by continuous innovation, customer feedback,
              and a passionate team that never settles for “good enough.”
            </p>
          </div>
        </TabPanel>

        <TabPanel>
          {/* Team & Others Panel */}
          <div className="mt-5 space-y-10">
            <h2 className="text-2xl font-bold text-secondary">Meet the Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { name: "Jhankar Mahabub", role: "CEO", gender: "men", id: 1 },
                { name: "Rasel Mahmud", role: "CTO", gender: "men", id: 2 },
                { name: "Abdur Rakib", role: "COO", gender: "men", id: 3 },
                {
                  name: "Ferdous Zihad",
                  role: "Team Lead",
                  gender: "men",
                  id: 4,
                },
              ].map((member) => (
                <div
                  key={member.name}
                  className="bg-base-100 rounded-xl p-4 shadow-md flex flex-col items-center text-center"
                >
                  <img
                    src={`https://randomuser.me/api/portraits/${member.gender}/${member.id}.jpg`}
                    alt={member.name}
                    className="w-24 h-24 rounded-full object-cover mb-4"
                  />
                  <h3 className="font-semibold text-lg">{member.name}</h3>
                  <p className="text-sm text-gray-500">{member.role}</p>
                </div>
              ))}
            </div>

            <div>
              <h3 className="text-xl font-semibold mt-8">Why We Stand Out</h3>
              <p className="mt-2 text-gray-700">
                Our team's shared vision and relentless pursuit of excellence
                make us stand out. We believe in building meaningful
                partnerships and delivering more than just parcels—we deliver
                satisfaction and trust.
              </p>
            </div>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
}
