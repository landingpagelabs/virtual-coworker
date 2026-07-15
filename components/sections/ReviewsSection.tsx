'use client';

import { useState, useEffect, useRef } from 'react';
import { loadMasonry, whenNearViewport } from '@/lib/loadVendor';

interface ReviewsSectionProps {
  section: {
    title?: string;
    reviews?: { _key?: string; name?: string; role?: string; quote?: string }[];
  };
}

// Cards rendered before the user expands the wall (CSS caps the visible
// count at 9 desktop / 3 mobile; the extra buffer covers wider viewports).
const INITIAL_CARDS = 12;

const REVIEWS = [
  { img: '1', name: "Douglas", role: "Construction business owner", quote: "We tried offshore VAs through other platforms and didn't have great luck. Felt transactional, lots of turnover. Virtual Coworker has been a different experience… What sets VC apart is that there's an actual account team behind the placement. When I had a question early on, someone called me back the same day. That kind of accountability is rare at this price point." },
  { img: '2', name: "Paul Slezak", role: "Cofounder, RecruitLoop", quote: "We had very high expectations in terms of the caliber of virtual team members we'd bring into the business and were so pleased with the quality of our first hire that we quickly sought out a second… The support and account management team behind Virtual Coworker is also great. High Fives all around." },
  { img: '3', name: "Matthew", role: "Marketing agency owner", quote: "Six months in, our senior team is back to doing strategy and client work and our margins look better for it. Our VA is smart, organized, and adapted quickly to our tools (ClickUp, Notion, Meta Ads Manager). Communication via Slack has been seamless across time zones. Honestly the best ops decision we made last year." },
  { img: '4', name: "Elyse Campbell", role: "Ace Accounting", quote: "Partnering with Virtual Coworker to hire a full-time remote accountant has been a game-changer for our firm. Their expertise and seamless integration into our team have dramatically enhanced our productivity and service quality." },
  { img: '5', name: "Richard", role: "Wellness practice owner", quote: "Virtual Coworker placed a patient coordinator who has been with us almost a year now… our no show rate has dropped noticeably since she started doing reminder calls. What I value most is continuity. She's been the same person the whole time, knows our patients and workflows, and feels like part of the team even though she's remote.." },
  { img: '6', name: "Gerry Brummer", role: "Manager, Designers Oil Perfumes", quote: "They understood our requirements and matched us with a capable virtual assistant. The onboarding was simple, and the quality of candidates was higher than expected. Their focus on reliability and proactive support made the whole experience feel very seamless and dependable." },
  { img: '7', name: "Dave", role: "B2B SaaS founder", quote: "We hired an SDR through Virtual Coworker to run outbound for a B2B SaaS product. Honest assessment: not every part was perfect… but our SDR booked 14 qualified meetings in the first quarter at a fraction of what a US-based hire would have cost." },
  { img: '8', name: "Kyrstin H.", role: "General Manager", quote: "Working with Virtual Coworker has been a true breeze… The recruiting process was well organized, and I feel we were matched very well. I have not found anything that our employees are unable to accomplish. I share my experience with all businesses who will listen." },
  { img: '9', name: "Mark Valli", role: "Valli Digital Marketing", quote: "Utilizing Virtual Coworker to hire a full-time remote social media manager was a strategic and fruitful decision for our agency. Our team member… has brought fresh, innovative ideas and exceptional engagement strategies that have significantly boosted our online presence and client satisfaction." },
  { img: '10', name: "Clayton", role: "Accounting firm owner", quote: "During tax season, I needed extra support for my accounting firm without hiring a full-time local employee. The assistant I was matched with handled scheduling, CRM updates, and client coordination independently with very little guidance." },
  { img: '11', name: "Jason Schulz", role: "Founder, My Nappies", quote: "It is simply too expensive to hire someone with the right skill set here in Australia… We needed someone who wanted to become a part of our business. The recruitment process with Virtual Coworker felt familiar and allowed us to bring on someone we were excited about. This was almost one year ago now and we still enjoy working with the same coworker today." },
  { img: '12', name: "E-commerce owner", role: "Verified review · Trustpilot", quote: "We met with a few agencies but chose Virtual Coworker as they have been around the longest and have a good support team. I liked the Account Manager aspect and the fact I was talking to someone on the ground in Australia (literally around the corner!) throughout. Good genuine company to work with." },
  { img: '13', name: "Edwin Onggo", role: "Founder, GiggedIn", quote: "There are massive opportunities to be had in hiring offshore talent in my opinion. The hard part is having to go through the arduous recruitment process to find the talent you need. That's why I found Virtual Coworker really useful. The team were great and made it super easy to screen and hire the manpower I needed." },
  { img: '14', name: "Lexi", role: "E-commerce website owner", quote: "VC made this easy by pre-scanning all candidates and giving us a shortlist to interview. All spoke great English and had loads of experience in call centers. They also send us through daily reports and screenshots of the work done and handle the whole HR side of it… We treat the staff like part of our team and hardly notice they are not here." },
  { img: '15', name: "Leonie", role: "Director, HR Industry", quote: "To be able to zero in on a suitable person with the skills that we required from Day One has been amazing. The alternative would have been spending large sums on trying out and training different applicants… The screening process of Virtual Coworker has enabled us to get straight into work without complications." },
  { img: '16', name: "Logan Merrick", role: "Strategic Director, Buzinga Apps", quote: "I have worked with a number of virtual staff services. However Kevin and the team at Virtual Coworker have provided me with the best value to date. They are responsive, helpful and went beyond the call to ensure our needs were met. I strongly recommend Virtual Coworker to anyone looking for virtual staff." },
  { img: '17', name: "Christian Luckow", role: "CEO, Omniveta Australia", quote: "I continue to be impressed by her. She has a level of skills and motivation that I would expect from a good permanent (onsite) resource. She works with limited guidance and is quickly becoming invaluable to my business." },
  { img: '18', name: "Rebecca Jones", role: "Director, Yacht and Boat", quote: "Now, some two years down the track, we are absolutely delighted with our valued colleague… She is proactive and enthusiastic to a degree that continually exceeds our expectations. In fact, our “Virtual Coworker” has become a good friend and is very much a part of our team." },
  { img: '19', name: "Mindy Prestage", role: "Office Manager, LINK", quote: "Virtual Coworker has given us a gift. Our VC is amazing; even better is she is part of our team. The recruitment process was painless… Our VC has been with us now for six months, and we have been able to take her from part-time to full-time almost immediately." },
  { img: '20', name: "Syakirah Sinin", role: "Marketing Executive, Yaktails Media", quote: "The candidates I have been offered all matched the requirements I needed. I was pleased, and at peace of mind as I knew, I was able to track what they do through the Daily Report and screenshots… I now have three workers employed through Virtual Coworker – all of quality and caliber." },
  { img: '21', name: "Doug Kane", role: "Founder, Harbor Village Cleaners", quote: "What impresses me most about Virtual Coworker is their strong support system and the professionalism of their accounting team. They were highly responsive, easy to communicate with, and consistently delivered accurate work." },
  { img: '22', name: "Asad Ali", role: "Owner, Asad & CO Lawyers", quote: "What I found most impressive about this company was their professionalism and consistency in delivering quality work. The virtual assistant was quick to understand my requirements and adapt to my workflow, which made collaboration very smooth." },
  { img: '23', name: "Adam Mark", role: "Marketing Director, Quality Obsessions", quote: "Most impressive about Virtual Coworker was their ability to quickly provide skilled and well-matched virtual assistants who understood the work requirements from the start. Their onboarding process was smooth… which reduced training time." },
  { img: '24', name: "Robert Liam", role: "Co-Founder, Genuine Appliances Repair", quote: "They were very responsive and supportive. The team listened to feedback, addressed concerns quickly, and stayed in regular contact to make sure everything was running smoothly and meeting expectations." },
  { img: '25', name: "David Boyd", role: "Director, Credit Card Compare", quote: "We're a pure play online financial services marketing company and when I needed a VA to help with growing admin tasks I reached out to Virtual Coworker. They found me an awesome VA with loads of work experience in finance. Honestly, it's something I should have done a long time ago." },
  { img: '26', name: "Rob Lambert", role: "CEO, Web Company", quote: "I've used freelance services in the past, but the difference with Virtual Coworker is that they manage the hiring process and any issues that might come up along the way, resulting in a staff member becoming part of the team. I'd highly recommend Virtual Coworker to anyone who's looking for great, hard-working talent at affordable rates." },
  { img: '27', name: "Nigel Moore", role: "Director, Moore Technology", quote: "My Experience with Virtual Coworker has been great. I highly recommend them for sourcing Filipino team members! Our team member has been fantastic – she fits into our team perfectly. I've already recommended Virtual Coworker to quite a few business associates." },
  { img: '28', name: "Thuy Pham", role: "Co-owner, Spectrum", quote: "They take the time to understand what you require from support staff and give you quality people to interview. You can tell that a bit of effort goes into the screening process on their end… It definitely cut the time it would have taken to source workers myself." },
  { img: '29', name: "David Sullivan", role: "Managing Director, The Learning Deli", quote: "We're very happy with the results our web developer has given us. He's been able to work autonomously and hiring him proved valuable to the team." },
  { img: '30', name: "Ashleigh Hoult", role: "Director, The PromoDonna", quote: "Right from the start, I found utilizing the services of Virtual Coworker to be seamless… My Virtual Assistant, Francis, was personable, easy to instruct, and performed the tasks with ease. Outsourcing the admin tasks that usually bogged me down during the work week lifted a huge weight off my shoulders." },
  { img: '31', name: "David Krynauw", role: "CEO, ProActive Media", quote: "My experience with Virtual Coworker has been Very positive. They are easy to deal with and very helpful in terms of finding staff for my needs. I used an assistant for website development in WordPress, and she was excellent… nothing was too much to ask of her." },
  { img: '32', name: "David Fuller", role: "Creative Director, Essendon Creative", quote: "My personal outsourcing process was long and drawn out, but ever since Virtual Coworker connected me with an amazing WordPress developer, I'm wondering why I didn't do it sooner! It's allowed me to focus on what I really love, which is spending time with and creating value for my clients." },
  { img: '33', name: "Ralph B", role: "Director", quote: "At first, we were a bit skeptical about how well it would actually work with someone joining our team remotely… Yet they made the entire process a breeze… their screening process was quite impressive. We would highly recommend using Virtual CoWorker's services if you are at all considering a remote talent workforce. F" },
  { img: '34', name: "Antonio", role: "Verified review · Trustpilot", quote: "Honestly couldn't be happier with Virtual Coworker. The onboarding process was seamless, the VA we were matched with is fantastic, and the communication throughout has been excellent. If you're on the fence about hiring a virtual assistant, this is the place to start." },
  { img: '35', name: "Benjamin", role: "Verified review · Trustpilot", quote: "Joe our new virtual assistant hired through Virtual Coworker, has hit the ground running. From day one, he's been proactive… He's already made meaningful contributions, recommending tools and processes that strengthen how we communicate across the team. It's great to have another strategic, operationally-minded virtual assistant on the team." },
  { img: '36', name: "Real estate owner", role: "Verified review · Trustpilot", quote: "Managing a small real estate company became overwhelming with all the admin tasks and scheduling. Hiring a dedicated VA saved me hours every week and allowed me to focus more on growing the business. The onboarding process was smooth and the match was exactly what I needed." },
  { img: '37', name: "Verified client", role: "Customer support · Trustpilot", quote: "Bringing in remote customer support helped us improve response times significantly within weeks. The hiring and setup process was efficient, and even after an early mismatch, the replacement turned out to be an excellent fit." },
  { img: '38', name: "Brent", role: "Verified review · Trustpilot", quote: "They've helped us scale by connecting us with really high-quality staff and the whole process has been seamless from start to finish. Communication has been great and the candidates have fit right in with our business." },
  { img: '39', name: "Noah", role: "Verified review · Trustpilot", quote: "We've been working with Stephanie through Virtual Coworker for 6 months now and she's been an awesome addition to our team. Her ability to quickly grasp concepts and get a real understanding of our business has been terrific." },
  { img: '40', name: "Jeffrey", role: "Verified review · Trustpilot", quote: "Lorraine is very efficient, proactive and thorough. She's prompt with tasks and has a great feel for our brand, keeping everything consistent across all outward-facing communications and social media. She's a fantastic support, keeping me on track and making sure everything runs smoothly." },
  { img: '41', name: "Eddie", role: "Verified review · Trustpilot", quote: "We're very impressed with Ryan's work ethic and drive. He consistently shows strong leadership and plays an important role within the team. His positive impact doesn't go unnoticed and we genuinely value what he brings." },
  { img: '42', name: "Lance", role: "Verified review · Trustpilot", quote: "Kate has become a key part of our team in a short time. She's skilled, reliable, and adds real value to the business every day." },
  { img: '43', name: "Naomi", role: "Verified review · Trustpilot", quote: "Eliah was so very helpful and patient. Not being a tech person I had some difficulties getting things sorted / done, but Eliah saved the day. The whole process of onboarding a new assistant has been swift and professional." },
  { img: '44', name: "Justin", role: "Verified review · Trustpilot", quote: "We worked with our part-time virtual designer for over 2 years. Great service and support. Only reason we stopped was because we decided to go in a different direction." },
  { img: '45', name: "Verified client", role: "Verified review · Trustpilot", quote: "I've had a great experience working with my virtual assistants. They're dependable, communicate clearly, and consistently deliver strong results, which has made my workload much easier to handle." },
  { img: '46', name: "John", role: "Verified review · Trustpilot", quote: "I've been working with Ryan for almost a year now and it's been a really positive experience throughout. They have made the whole thing so easy." },
  { img: '47', name: "Verified client", role: "Verified review · Trustpilot", quote: "Joe has been amazing to work with. He's a great addition to the team and always brings professionalism and positivity." },
  { img: '48', name: "Sayuri", role: "Verified review · Trustpilot", quote: "My VA is absolutely amazing—I truly enjoy working with her. She's reliable, efficient, and a pleasure to collaborate with." },
  { img: '49', name: "Suze Orman", role: "Co-Founder, Taylored Touch Massage & Beauty Spa", quote: "Overall, our experience has been positive from start to finish." },
  { img: '51', name: "Tomoe", role: "Verified review · Trustpilot", quote: "They always support our business! Truly amazing customer support!" },
  { img: '52', name: "Matthew", role: "Verified review · Trustpilot", quote: "One of the best companies I have worked with. Very friendly staff and their management team is top notch. Highly recommend them for your office needs." },
  { img: '53', name: "Finance Manager", role: "Healthcare company · Clutch", quote: "Virtual Coworker is always correct with their data management… The team is also easy to deal with. No, we are very happy with their work." },
];

const FiveStars = () => (
  <svg width="90" height="16" viewBox="0 0 90 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    {[0, 18.43, 36.86, 55.29, 73.73].map((x, i) => (
      <path key={i} fillRule="evenodd" clipRule="evenodd"
        d={`M${(7.14 + x).toFixed(2)} 0.66C${(7.51 + x).toFixed(2)} -0.22 ${(8.76 + x).toFixed(2)} -0.22 ${(9.13 + x).toFixed(2)} 0.66L${(10.84 + x).toFixed(2)} 4.77L${(15.27 + x).toFixed(2)} 5.13C${(16.23 + x).toFixed(2)} 5.21 ${(16.62 + x).toFixed(2)} 6.40 ${(15.89 + x).toFixed(2)} 7.02L${(12.51 + x).toFixed(2)} 9.92L${(13.54 + x).toFixed(2)} 14.25C${(13.76 + x).toFixed(2)} 15.18 ${(12.75 + x).toFixed(2)} 15.91 ${(11.93 + x).toFixed(2)} 15.42L${(8.13 + x).toFixed(2)} 13.10L${(4.34 + x).toFixed(2)} 15.42C${(3.52 + x).toFixed(2)} 15.91 ${(2.50 + x).toFixed(2)} 15.18 ${(2.73 + x).toFixed(2)} 14.25L${(3.76 + x).toFixed(2)} 9.92L${(0.38 + x).toFixed(2)} 7.02C${(-0.35 + x).toFixed(2)} 6.40 ${(0.04 + x).toFixed(2)} 5.21 ${(0.99 + x).toFixed(2)} 5.13L${(5.43 + x).toFixed(2)} 4.77L${(7.14 + x).toFixed(2)} 0.66Z`}
        fill="#FCC100" />
    ))}
  </svg>
);

const VerifiedBadge = () => (
  <svg width="110" height="20" viewBox="0 0 110 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.4507 3.43337L10.8673 1.7167C10.3923 1.5417 9.61732 1.5417 9.14232 1.7167L4.55898 3.43337C3.67565 3.7667 2.95898 4.80003 2.95898 5.7417V12.4917C2.95898 13.1667 3.40065 14.0584 3.94232 14.4584L8.52565 17.8834C9.33398 18.4917 10.659 18.4917 11.4673 17.8834L16.0507 14.4584C16.5923 14.05 17.034 13.1667 17.034 12.4917V5.7417C17.0423 4.80003 16.3257 3.7667 15.4507 3.43337ZM12.9007 8.10003L9.31732 11.6834C9.19232 11.8084 9.03398 11.8667 8.87565 11.8667C8.71732 11.8667 8.55898 11.8084 8.43398 11.6834L7.10065 10.3334C6.85898 10.0917 6.85898 9.6917 7.10065 9.45003C7.34232 9.20837 7.74232 9.20837 7.98398 9.45003L8.88398 10.35L12.0257 7.20837C12.2673 6.9667 12.6673 6.9667 12.909 7.20837C13.1507 7.45003 13.1507 7.85837 12.9007 8.10003Z" fill="#F9FEED" />
    <path d="M23.7216 5.77273L26.1506 12.8807H26.2486L28.6776 5.77273H30.1009L26.9602 14.5H25.4389L22.2983 5.77273H23.7216ZM33.3037 14.6321C32.6588 14.6321 32.1034 14.4943 31.6375 14.2188C31.1744 13.9403 30.8164 13.5497 30.5636 13.0469C30.3136 12.5412 30.1886 11.9489 30.1886 11.2699C30.1886 10.5994 30.3136 10.0085 30.5636 9.49716C30.8164 8.9858 31.1687 8.58665 31.6204 8.29972C32.075 8.01278 32.6062 7.86932 33.2142 7.86932C33.5835 7.86932 33.9414 7.9304 34.288 8.05256C34.6346 8.17472 34.9457 8.36648 35.2213 8.62784C35.4968 8.8892 35.7142 9.22869 35.8733 9.64631C36.0323 10.0611 36.1119 10.5653 36.1119 11.1591V11.6108H30.9088V10.6562H34.8633C34.8633 10.321 34.7951 10.0241 34.6588 9.76562C34.5224 9.50426 34.3306 9.2983 34.0835 9.14773C33.8392 8.99716 33.5522 8.92188 33.2227 8.92188C32.8647 8.92188 32.5522 9.00994 32.2852 9.18608C32.021 9.35937 31.8164 9.58665 31.6715 9.8679C31.5295 10.1463 31.4585 10.4489 31.4585 10.7756V11.5213C31.4585 11.9588 31.5352 12.331 31.6886 12.6378C31.8448 12.9446 32.0622 13.179 32.3406 13.3409C32.619 13.5 32.9443 13.5795 33.3164 13.5795C33.5579 13.5795 33.7781 13.5455 33.9769 13.4773C34.1758 13.4062 34.3477 13.3011 34.4926 13.1619C34.6375 13.0227 34.7483 12.8509 34.825 12.6463L36.0309 12.8636C35.9343 13.2187 35.761 13.5298 35.511 13.7969C35.2639 14.0611 34.9528 14.267 34.5778 14.4148C34.2056 14.5597 33.7809 14.6321 33.3037 14.6321ZM37.4056 14.5V7.95455H38.6371V8.99432H38.7053C38.8246 8.64205 39.0349 8.36506 39.336 8.16335C39.64 7.95881 39.9837 7.85653 40.3672 7.85653C40.4468 7.85653 40.5405 7.85937 40.6485 7.86506C40.7593 7.87074 40.8459 7.87784 40.9084 7.88636V9.10511C40.8573 9.09091 40.7664 9.07528 40.6357 9.05824C40.505 9.03835 40.3743 9.02841 40.2437 9.02841C39.9425 9.02841 39.6741 9.09233 39.4383 9.22017C39.2053 9.34517 39.0207 9.51989 38.8843 9.74432C38.7479 9.96591 38.6797 10.2187 38.6797 10.5028V14.5H37.4056ZM41.8911 14.5V7.95455H43.1652V14.5H41.8911ZM42.5345 6.9446C42.3129 6.9446 42.1226 6.87074 41.9635 6.72301C41.8073 6.57244 41.7291 6.39347 41.7291 6.18608C41.7291 5.97585 41.8073 5.79687 41.9635 5.64915C42.1226 5.49858 42.3129 5.4233 42.5345 5.4233C42.7561 5.4233 42.945 5.49858 43.1013 5.64915C43.2604 5.79687 43.3399 5.97585 43.3399 6.18608C43.3399 6.39347 43.2604 6.57244 43.1013 6.72301C42.945 6.87074 42.7561 6.9446 42.5345 6.9446ZM47.8744 7.95455V8.97727H44.1755V7.95455H47.8744ZM45.1897 14.5V7.19602C45.1897 6.78693 45.2792 6.44744 45.4582 6.17756C45.6372 5.90483 45.8744 5.7017 46.1699 5.56818C46.4653 5.43182 46.7863 5.36364 47.1329 5.36364C47.3886 5.36364 47.6074 5.38494 47.7892 5.42756C47.971 5.46733 48.1059 5.50426 48.194 5.53835L47.8957 6.5696C47.8361 6.55256 47.7593 6.53267 47.6656 6.50994C47.5718 6.48437 47.4582 6.47159 47.3247 6.47159C47.015 6.47159 46.7934 6.5483 46.6599 6.7017C46.5292 6.85511 46.4639 7.0767 46.4639 7.36648V14.5H45.1897ZM49.069 14.5V7.95455H50.3432V14.5H49.069ZM49.7125 6.9446C49.4909 6.9446 49.3006 6.87074 49.1415 6.72301C48.9852 6.57244 48.9071 6.39347 48.9071 6.18608C48.9071 5.97585 48.9852 5.79687 49.1415 5.64915C49.3006 5.49858 49.4909 5.4233 49.7125 5.4233C49.9341 5.4233 50.123 5.49858 50.2793 5.64915C50.4384 5.79687 50.5179 5.97585 50.5179 6.18608C50.5179 6.39347 50.4384 6.57244 50.2793 6.72301C50.123 6.87074 49.9341 6.9446 49.7125 6.9446ZM54.7583 14.6321C54.1135 14.6321 53.5581 14.4943 53.0921 14.2188C52.6291 13.9403 52.2711 13.5497 52.0183 13.0469C51.7683 12.5412 51.6433 11.9489 51.6433 11.2699C51.6433 10.5994 51.7683 10.0085 52.0183 9.49716C52.2711 8.9858 52.6234 8.58665 53.0751 8.29972C53.5296 8.01278 54.0609 7.86932 54.6689 7.86932C55.0382 7.86932 55.3961 7.9304 55.7427 8.05256C56.0893 8.17472 56.4004 8.36648 56.676 8.62784C56.9515 8.8892 57.1689 9.22869 57.3279 9.64631C57.487 10.0611 57.5666 10.5653 57.5666 11.1591V11.6108H52.3635V10.6562H56.318C56.318 10.321 56.2498 10.0241 56.1135 9.76562C55.9771 9.50426 55.7853 9.2983 55.5382 9.14773C55.2939 8.99716 55.0069 8.92188 54.6774 8.92188C54.3194 8.92188 54.0069 9.00994 53.7399 9.18608C53.4757 9.35937 53.2711 9.58665 53.1262 9.8679C52.9842 10.1463 52.9132 10.4489 52.9132 10.7756V11.5213C52.9132 11.9588 52.9899 12.331 53.1433 12.6378C53.2995 12.9446 53.5169 13.179 53.7953 13.3409C54.0737 13.5 54.399 13.5795 54.7711 13.5795C55.0126 13.5795 55.2328 13.5455 55.4316 13.4773C55.6305 13.4062 55.8024 13.3011 55.9473 13.1619C56.0921 13.0227 56.2029 12.8509 56.2796 12.6463L57.4856 12.8636C57.389 13.2187 57.2157 13.5298 56.9657 13.7969C56.7186 14.0611 56.4075 14.267 56.0325 14.4148C55.6603 14.5597 55.2356 14.6321 54.7583 14.6321ZM61.3106 14.6278C60.7822 14.6278 60.3106 14.4929 59.8958 14.223C59.4839 13.9503 59.16 13.5625 58.9242 13.0597C58.6912 12.554 58.5748 11.9474 58.5748 11.2401C58.5748 10.5327 58.6927 9.92756 58.9285 9.42472C59.1671 8.92187 59.4938 8.53693 59.9086 8.26989C60.3234 8.00284 60.7935 7.86932 61.3191 7.86932C61.7253 7.86932 62.052 7.9375 62.2992 8.07386C62.5492 8.20739 62.7424 8.36364 62.8787 8.54261C63.018 8.72159 63.1259 8.87926 63.2026 9.01562H63.2793V5.77273H64.5535V14.5H63.3091V13.4815H63.2026C63.1259 13.6207 63.0151 13.7798 62.8702 13.9588C62.7282 14.1378 62.5322 14.294 62.2822 14.4276C62.0322 14.5611 61.7083 14.6278 61.3106 14.6278ZM61.5918 13.5412C61.9583 13.5412 62.268 13.4446 62.5208 13.2514C62.7765 13.0554 62.9697 12.7841 63.1003 12.4375C63.2339 12.0909 63.3006 11.6875 63.3006 11.2273C63.3006 10.7727 63.2353 10.375 63.1046 10.0341C62.9739 9.69318 62.7822 9.42756 62.5293 9.23722C62.2765 9.04687 61.964 8.9517 61.5918 8.9517C61.2083 8.9517 60.8887 9.05114 60.633 9.25C60.3773 9.44886 60.1841 9.72017 60.0535 10.0639C59.9256 10.4077 59.8617 10.7955 59.8617 11.2273C59.8617 11.6648 59.927 12.0582 60.0577 12.4077C60.1884 12.7571 60.3816 13.0341 60.6373 13.2386C60.8958 13.4403 61.214 13.5412 61.5918 13.5412ZM69.4101 14.5V5.77273H72.5209C73.197 5.77273 73.7581 5.8892 74.2041 6.12216C74.653 6.35511 74.9882 6.67756 75.2098 7.08949C75.4314 7.49858 75.5422 7.97159 75.5422 8.50852C75.5422 9.04261 75.4299 9.51278 75.2055 9.91903C74.9839 10.3224 74.6487 10.6364 74.1998 10.8608C73.7538 11.0852 73.1927 11.1974 72.5166 11.1974H70.1601V10.0639H72.3973C72.8234 10.0639 73.17 10.0028 73.437 9.88068C73.7069 9.75852 73.9044 9.58097 74.0294 9.34801C74.1544 9.11506 74.2169 8.83523 74.2169 8.50852C74.2169 8.17898 74.153 7.89347 74.0251 7.65199C73.9001 7.41051 73.7027 7.22585 73.4328 7.09801C73.1657 6.96733 72.8149 6.90199 72.3802 6.90199H70.7268V14.5H69.4101ZM73.7183 10.5625L75.8745 14.5H74.3745L72.2609 10.5625H73.7183ZM79.6611 14.6321C79.0163 14.6321 78.4609 14.4943 77.995 14.2188C77.5319 13.9403 77.1739 13.5497 76.9211 13.0469C76.6711 12.5412 76.5461 11.9489 76.5461 11.2699C76.5461 10.5994 76.6711 10.0085 76.9211 9.49716C77.1739 8.9858 77.5262 8.58665 77.9779 8.29972C78.4325 8.01278 78.9637 7.86932 79.5717 7.86932C79.941 7.86932 80.2989 7.9304 80.6455 8.05256C80.9921 8.17472 81.3032 8.36648 81.5788 8.62784C81.8543 8.8892 82.0717 9.22869 82.2308 9.64631C82.3898 10.0611 82.4694 10.5653 82.4694 11.1591V11.6108H77.2663V10.6562H81.2208C81.2208 10.321 81.1526 10.0241 81.0163 9.76562C80.8799 9.50426 80.6881 9.2983 80.441 9.14773C80.1967 8.99716 79.9097 8.92188 79.5802 8.92188C79.2222 8.92188 78.9097 9.00994 78.6427 9.18608C78.3785 9.35937 78.1739 9.58665 78.029 9.8679C77.887 10.1463 77.816 10.4489 77.816 10.7756V11.5213C77.816 11.9588 77.8927 12.331 78.0461 12.6378C78.2023 12.9446 78.4197 13.179 78.6981 13.3409C78.9765 13.5 79.3018 13.5795 79.6739 13.5795C79.9154 13.5795 80.1356 13.5455 80.3344 13.4773C80.5333 13.4062 80.7052 13.3011 80.8501 13.1619C80.995 13.0227 81.1058 12.8509 81.1825 12.6463L82.3884 12.8636C82.2918 13.2187 82.1185 13.5298 81.8685 13.7969C81.6214 14.0611 81.3103 14.267 80.9353 14.4148C80.5631 14.5597 80.1384 14.6321 79.6611 14.6321ZM89.175 7.95455L86.8014 14.5H85.4378L83.06 7.95455H84.4279L86.0855 12.9915H86.1537L87.8071 7.95455H89.175ZM90.2525 14.5V7.95455H91.5266V14.5H90.2525ZM90.8959 6.9446C90.6743 6.9446 90.484 6.87074 90.3249 6.72301C90.1687 6.57244 90.0905 6.39347 90.0905 6.18608C90.0905 5.97585 90.1687 5.79687 90.3249 5.64915C90.484 5.49858 90.6743 5.4233 90.8959 5.4233C91.1175 5.4233 91.3064 5.49858 91.4627 5.64915C91.6218 5.79687 91.7013 5.97585 91.7013 6.18608C91.7013 6.39347 91.6218 6.57244 91.4627 6.72301C91.3064 6.87074 91.1175 6.9446 90.8959 6.9446ZM95.9418 14.6321C95.2969 14.6321 94.7415 14.4943 94.2756 14.2188C93.8125 13.9403 93.4546 13.5497 93.2017 13.0469C92.9517 12.5412 92.8267 11.9489 92.8267 11.2699C92.8267 10.5994 92.9517 10.0085 93.2017 9.49716C93.4546 8.9858 93.8068 8.58665 94.2585 8.29972C94.7131 8.01278 95.2443 7.86932 95.8523 7.86932C96.2216 7.86932 96.5796 7.9304 96.9262 8.05256C97.2727 8.17472 97.5838 8.36648 97.8594 8.62784C98.135 8.8892 98.3523 9.22869 98.5114 9.64631C98.6705 10.0611 98.75 10.5653 98.75 11.1591V11.6108H93.5469V10.6562H97.5014C97.5014 10.321 97.4333 10.0241 97.2969 9.76562C97.1605 9.50426 96.9688 9.2983 96.7216 9.14773C96.4773 8.99716 96.1904 8.92188 95.8608 8.92188C95.5029 8.92188 95.1904 9.00994 94.9233 9.18608C94.6591 9.35937 94.4546 9.58665 94.3097 9.8679C94.1676 10.1463 94.0966 10.4489 94.0966 10.7756V11.5213C94.0966 11.9588 94.1733 12.331 94.3267 12.6378C94.483 12.9446 94.7003 13.179 94.9787 13.3409C95.2571 13.5 95.5824 13.5795 95.9546 13.5795C96.196 13.5795 96.4162 13.5455 96.6151 13.4773C96.8139 13.4062 96.9858 13.3011 97.1307 13.1619C97.2756 13.0227 97.3864 12.8509 97.4631 12.6463L98.6691 12.8636C98.5725 13.2187 98.3992 13.5298 98.1492 13.7969C97.902 14.0611 97.5909 14.267 97.2159 14.4148C96.8438 14.5597 96.4191 14.6321 95.9418 14.6321ZM101.451 14.5L99.5249 7.95455H100.842L102.124 12.7614H102.188L103.475 7.95455H104.792L106.07 12.7401H106.134L107.408 7.95455H108.725L106.803 14.5H105.504L104.174 9.77415H104.076L102.746 14.5H101.451Z" fill="#41424D" />
  </svg>
);

export default function ReviewsSection({ section }: ReviewsSectionProps) {
  const [expanded, setExpanded] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const masonryRef = useRef<any>(null);

  // Initialise Masonry once the CDN script is available.
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ensure = (): boolean => {
      const Masonry = (window as any).Masonry;
      if (!Masonry || !gridRef.current) return false;
      if (!masonryRef.current) {
        masonryRef.current = new Masonry(gridRef.current, {
          itemSelector: '.reviews_item',
          columnWidth: 353,
          gutter: 20,
          horizontalOrder: true,
        });
      }
      return true;
    };

    const onLoad = () => masonryRef.current?.layout?.();

    // Masonry is fetched only once the wall nears the viewport (it's far below
    // the fold), so it costs nothing on first paint.
    let killed = false;
    const grid = gridRef.current;
    if (grid) {
      (async () => {
        await whenNearViewport(grid);
        if (killed) return;
        await loadMasonry();
        if (killed) return;
        if (ensure()) masonryRef.current?.layout?.();
      })();
    }
    window.addEventListener('load', onLoad);

    return () => {
      killed = true;
      window.removeEventListener('load', onLoad);
      masonryRef.current?.destroy?.();
      masonryRef.current = null;
    };
  }, []);

  // Re-layout whenever the list expands/collapses (after the CSS reflow).
  // reloadItems() first: expanding renders 40+ new cards that Masonry has
  // never seen, and layout() alone only re-lays its cached item list — the
  // new cards would flow unpositioned over the absolutely-placed ones (the
  // "Show More isn't working" bug, Figma annotation 2026-07-15).
  useEffect(() => {
    const t = setTimeout(() => {
      masonryRef.current?.reloadItems?.();
      masonryRef.current?.layout?.();
    }, 60);
    return () => clearTimeout(t);
  }, [expanded]);

  const handleToggle = () => {
    const willCollapse = expanded;
    setExpanded((v) => !v);
    // On collapse, return the user to the top of the testimonial wall
    // (the grid top stays put, so scrolling immediately is safe).
    if (willCollapse) {
      gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="reviews">
      <div className="padding-global">
        <div className="container-large-l">
          <div className="reviews_wrapper">
            <div className="reviews_title-wrap">
              <h2 className="title-h2 white">
                {section.title || "Here's what businesses say about their Virtual Coworkers..."}
              </h2>
            </div>

            <div ref={gridRef} className={`reviews_list${expanded ? ' expanded' : ''}`}>
              <div className={`reasons_decor${expanded ? ' active' : ''}`} />
              {/* Only the cards that can actually be seen before "Show more"
                  are rendered (CSS shows 9 on desktop / 3 on mobile). Putting
                  all 52 in the initial HTML tripled the document and the DOM. */}
              {(expanded ? REVIEWS : REVIEWS.slice(0, INITIAL_CARDS)).map((r, i) => {
                // Text is content-driven; avatars stay welded to their index
                // (the img filenames aren't derivable from the content).
                const c = section.reviews?.[i];
                const name = c?.name ?? r.name;
                return (
                  <div className="reviews_item" key={c?._key ?? i}>
                    <div className="reviews_item-head">
                      <FiveStars />
                      <VerifiedBadge />
                    </div>
                    <div className="reviews_item-content">
                      <p className="text-body-regular">{c?.quote ?? r.quote}</p>
                    </div>
                    <div className="reviews_avatar-info">
                      <div className="reviews_avatar">
                        <img src={`/images/sections/reviews/${r.img}.avif`} width={88} height={88} loading="lazy" decoding="async" alt={name} />
                      </div>
                      <div className="reviews_info">
                        <p className="text-label-extra-small">{name}</p>
                        <p className="text-body-small">{c?.role ?? r.role}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="reasons_cta" id="reviews-cta" onClick={handleToggle}>
              <img className="reasons_cta-image" src="/images/sections/reviews/zxc.avif" width={260} height={61} alt="" loading="lazy" decoding="async" />
              <p className="text-body-regular white ls-2 mobile-d-none">400+ Businesses Proudly Matched With Expert VAs</p>
              <svg width="1" height="18" viewBox="0 0 1 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="0.5" y1="18" x2="0.5" stroke="white" strokeOpacity="0.3" />
              </svg>
              <p className="reasons_cta-text-swap white">{expanded ? 'Show Less Reviews' : 'Show More Reviews'}</p>
              <div className="reasons_cta-icon">
                <div className={`reasons_cta-icon-plus${expanded ? ' active' : ''}`} />
                <div className="reasons_cta-icon-minus" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
