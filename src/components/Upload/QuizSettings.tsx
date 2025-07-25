import React from 'react';
import { motion } from 'framer-motion';
import { Settings, HelpCircle } from 'lucide-react';

interface QuizSettingsProps {
  questionCount: number;
  onQuestionCountChange: (count: number) => void;
  disabled?: boolean;
}

const QuizSettings: React.FC<QuizSettingsProps> = ({
  questionCount,
  onQuestionCountChange,
  disabled = false,
}) => {
  const questionOptions = [3, 4, 5, 6, 7, 8, 9, 10, 12, 15];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-lg p-6 border border-[#CBD5E1]"
    >
      <h3 className="text-lg font-semibold text-[#2E3A59] mb-4 flex items-center space-x-2">
        <Settings className="h-5 w-5 text-[#3CA7E0]" />
        <span>Quiz Settings</span>
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#2E3A59] mb-2">
            Number of Questions
          </label>
          <div className="grid grid-cols-5 gap-2">
            {questionOptions.map((count) => (
              <motion.button
                key={count}
                onClick={() => onQuestionCountChange(count)}
                disabled={disabled}
                className={`py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  questionCount === count
                    ? 'bg-[#3CA7E0] text-white shadow-md'
                    : 'bg-[#F5F7FA] text-[#2E3A59] hover:bg-[#5ED3F3]/20 border border-[#CBD5E1]'
                } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                whileHover={!disabled ? { scale: 1.05 } : {}}
                whileTap={!disabled ? { scale: 0.95 } : {}}
              >
                {count}
              </motion.button>
            ))}
          </div>
          <p className="text-xs text-[#BFC9D9] mt-2">
            Choose between 3-15 questions for your quiz
          </p>
        </div>

        <div className="bg-[#F5F7FA] rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <HelpCircle className="h-4 w-4 text-[#3CA7E0] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-[#2E3A59] font-medium mb-1">Enhanced AI Quiz Generation</p>
              <p className="text-xs text-[#BFC9D9]">
                Our advanced AI analyzes your document's structure, concepts, definitions, and facts to create 
                contextually relevant multiple-choice questions with intelligent distractors based on the actual content.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
          <div className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <p className="text-xs text-blue-800 font-medium mb-1">Smart Question Types</p>
              <ul className="text-xs text-blue-700 space-y-1">
                <li>• Definition-based questions (25%)</li>
                <li>• Concept application questions (25%)</li>
                <li>• Fact and data questions (25%)</li>
                <li>• Process and procedure questions (25%)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default QuizSettings;