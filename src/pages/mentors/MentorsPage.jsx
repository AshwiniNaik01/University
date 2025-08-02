import React from 'react'
import { mentors } from '../../data/mentors'
import Mentor from '../../components/mentors/Mentor'
import { Button } from '../../components/utility/Button'

const MentorsPage = () => {
    return (
        <section className="py-8 md:py-16 bg-white">
            <div className="container">
                <div className="text-center">

                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4 inline-block relative">
                        Our Mentors
                        <span className="absolute left-1/2 -bottom-2 w-2/3 h-1 bg-codedrift-gradient rounded-full transform -translate-x-1/2"></span>
                    </h2>
                </div>

                <div className="mt-4 md:mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {mentors.map((mentor, i) => (
                        <Mentor key={i} mentor={mentor} />
                    ))}
                </div>

                <div className="mt-4 md:mt-12 text-center">
                    <Button size="md" className="gap-2">
                        Show More ...
                    </Button>
                </div>
            </div>
        </section>
    )
}

export default MentorsPage
