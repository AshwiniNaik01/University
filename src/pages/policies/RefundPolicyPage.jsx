
const RefundPolicyPage = () => {
  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <section className="py-7 bg-gradient-to-r from-[#fdfbfb] to-[#ebedee] text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Code Drift Policy & Refund
        </h1>
        <p className="max-w-2xl mx-auto text-gray-600 text-lg">
          Please review the policy and guidelines of{" "}
          <span className="text-codedrift-pink font-semibold">
            Code Drift Training Institute.
          </span>{" "}
          These policies are designed to ensure a smooth and respectful learning
          environment.
        </p>
      </section>

      {/* Policy Content */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto space-y-10 text-gray-700 leading-relaxed">
          {/* 1. General Rules & Conduct */}
          <div>
            <h2 className="text-2xl font-bold text-codedrift-indigo mb-2">
              1. General Rules & Conduct
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li>
                All students are expected to maintain discipline, respect
                trainers, staff, and peers, in accordance with applicable laws.
              </li>
              <li>
                Any form of misbehavior, harassment, or misconduct will not be
                tolerated.
              </li>
            </ul>
          </div>

          {/* 2. Admissions & Fees */}
          <div>
            <h2 className="text-2xl font-bold text-codedrift-indigo mb-2">
              2. Admissions & Fees
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Students must preferably pay the full course fee in one-time
                payment.
              </li>
              <li>
                If a candidate is not fully confirmed about a course, a first
                installment option is allowed.
              </li>
              <li>
                No refunds will be provided under any circumstances, whether
                full fee, half payment, or installment, even if the student has
                not attended any session.
              </li>
            </ul>
          </div>

          {/* 3. Attendance Policy */}
          <div>
            <h2 className="text-2xl font-bold text-codedrift-indigo mb-2">
              3. Attendance Policy
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Attendance is not strictly enforced.</li>
              <li>
                Students are encouraged, but not required, to inform in advance
                about absences.
              </li>
              <li>Absences will not affect certification.</li>
            </ul>
          </div>

          {/* 4. Student Code of Conduct */}
          <div>
            <h2 className="text-2xl font-bold text-codedrift-indigo mb-2">
              4. Student Code of Conduct
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Students must adhere to discipline and lawful behavior.</li>
              <li>Mobile phone usage during class is allowed.</li>
              <li>
                Recording of lectures is strictly prohibited without prior
                written approval.
              </li>
            </ul>
          </div>

          {/* 5. Exams, Assessments & Certifications */}
          <div>
            <h2 className="text-2xl font-bold text-codedrift-indigo mb-2">
              5. Exams, Assessments & Certifications
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Exams/assessments are mandatory to qualify for certification.
              </li>
              <li>
                Attendance or participation alone does not qualify a student for
                certification.
              </li>
              <li>
                Certificates will be issued in both digital and printed formats.
              </li>
            </ul>
          </div>

          {/* 6. Use of Institute Resources */}
          <div>
            <h2 className="text-2xl font-bold text-codedrift-indigo mb-2">
              6. Use of Institute Resources
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li>
                All institute resources (labs, computers, internet, and
                software) must be used strictly for learning purposes only.
              </li>
              <li>
                Students will be held liable for any damage due to misuse or
                negligence.
              </li>
              <li>
                Installation or alteration of system settings is allowed (no
                restrictions).
              </li>
            </ul>
          </div>

          {/* 7. Placement Assistance */}
          <div>
            <h2 className="text-2xl font-bold text-codedrift-indigo mb-2">
              7. Placement Assistance
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li>
                The institute provides placement assistance only, including
                interview preparation, guidance, and referrals.
              </li>
              <li>The institute does not guarantee jobs.</li>
              <li>
                Final hiring decisions rest entirely with the recruiting
                companies.
              </li>
            </ul>
          </div>

          {/* 8. Refund & Cancellation Policy */}
          <div>
            <h2 className="text-2xl font-bold text-codedrift-indigo mb-2">
              8. Refund & Cancellation Policy
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Students may transfer their admission to another batch or course
                if unable to attend the original one.
              </li>
              <li>
                No refunds will be provided under any circumstances, including
                medical or personal emergencies.
              </li>
            </ul>
          </div>

          {/* 9. Disciplinary Actions & Termination */}
          <div>
            <h2 className="text-2xl font-bold text-codedrift-indigo mb-2">
              9. Disciplinary Actions & Termination
            </h2>
            <ul className="list-disc list-inside space-y-1">
              <li>
                Serious violations (e.g., misconduct, harassment, exam cheating)
                will lead to immediate termination.
              </li>
              <li>
                Minor issues will follow a written warning system before
                termination.
              </li>
              <li>
                The institute reserves the right to terminate enrollment without
                refund in case of violations.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RefundPolicyPage;
