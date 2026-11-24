
import React, { useState } from 'react';
import { api } from '../../services/api';

import {
  Plus, X, Sparkles, ArrowRight, ArrowLeft,
  CheckCircle2, Award, RotateCcw
} from 'lucide-react';

const suggestedSkills = [
  'Python',
  'Java',
  'C++',
  'JavaScript',
  'React',
  'SQL'
];

export const SkillAssessment = () => {
  const [skillInput, setSkillInput] = useState('');
  const [skills, setSkills] = useState([]);
  const [error, setError] = useState('');

  const [phase, setPhase] = useState('skills');
  const [isLoading, setIsLoading] = useState(false);

  const [assessmentId, setAssessmentId] = useState(null);
  const [allQuestions, setAllQuestions] = useState([]);

  const [skillIndex, setSkillIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);

  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);

  // Add selected skills
  const addSkill = (value = skillInput) => {
    const cleaned = value
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    setSkills(current => {
      const existing = new Set(
        current.map(s => s.toLowerCase())
      );

      const newSkills = cleaned.filter(
        s => !existing.has(s.toLowerCase())
      );

      if (current.length + newSkills.length > 5) {
        setError('You can select a maximum of 5 skills.');
        return current;
      }

      setError('');

      return [...current, ...newSkills];
    });

    setSkillInput('');
  };

  const removeSkill = skill => {
    setSkills(current =>
      current.filter(s => s !== skill)
    );
  };

  // Generate questions through Flask and Gemini
  const startAssessment = async () => {
    if (skills.length === 0) {
      setError('Please add at least one skill.');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const response = await api.generateSkillQuestions(skills);

      if (
        !response.questions ||
        response.questions.length === 0 ||
        !response.assessment_id
      ) {
        throw new Error('No questions were generated. Please try again.');
      }

      setAssessmentId(response.assessment_id);
      setAllQuestions(response.questions);

      setSkillIndex(0);
      setQuestionIndex(0);
      setAnswers({});
      setResults(null);

      setPhase('quiz');

    } catch (err) {
      setError(err.message || 'Unable to generate questions.');
    } finally {
      setIsLoading(false);
    }
  };

  // Get questions belonging to the current skill
  const currentSkill = skills[skillIndex];

  const questions = allQuestions.filter(
    question =>
      question.skill.toLowerCase() === currentSkill?.toLowerCase()
  );

  const currentQuestion = questions[questionIndex];

  // Use backend question ID as the answer key
  const answerKey = currentQuestion
    ? String(currentQuestion.id)
    : '';

  const selectedAnswer = answerKey
    ? answers[answerKey]
    : undefined;

  // Select an answer
  const selectAnswer = optionIndex => {
    setAnswers(current => ({
      ...current,
      [answerKey]: optionIndex
    }));
  };

  // Submit the complete assessment to Flask
  const submitAssessment = async () => {
    setError('');
    setIsLoading(true);

    try {
      const response = await api.submitSkillAssessment(
        assessmentId,
        answers
      );

      // Convert backend skill results into UI format
      const formattedResults = Object.entries(
        response.skill_results || {}
      ).map(([skill, result]) => ({
        skill,
        score: result.correct,
        total: result.total,
        percentage: result.total > 0
          ? Math.round(
              (result.correct / result.total) * 100
            )
          : 0
      }));

      setResults({
        score: response.score,
        total: response.total_questions,
        percentage: response.percentage,
        skills: formattedResults
      });

      setPhase('results');

    } catch (err) {
      setError(
        err.message || 'Unable to submit assessment.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Move to the next skill or submit final assessment
  const finishCurrentSkill = async () => {
    if (skillIndex < skills.length - 1) {
      setSkillIndex(current => current + 1);
      setQuestionIndex(0);
      setError('');
      return;
    }

    await submitAssessment();
  };

  // Restart assessment
  const restartAssessment = () => {
    setPhase('skills');
    setSkillIndex(0);
    setQuestionIndex(0);

    setAssessmentId(null);
    setAllQuestions([]);
    setAnswers({});
    setResults(null);
    setError('');
    setIsLoading(false);
  };

  // ==========================================
  // SKILL SELECTION SCREEN
  // ==========================================

  if (phase === 'skills') {
    return (
      <div className="space-y-6">
        <section className="glass-panel rounded-2xl border border-white/[0.08] p-5 sm:p-7">

          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#00F2FE]/25 bg-[#00F2FE]/10">
              <Sparkles className="h-5 w-5 text-[#00F2FE]" />
            </div>

            <div>
              <p className="text-[10px] font-mono-tabular uppercase tracking-[0.18em] text-[#00F2FE]">
                Personalised skill evaluation
              </p>

              <h2 className="mt-1 text-xl font-bold text-white sm:text-2xl">
                Assess your skills
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#94A3B8]">
                Add the technical or soft skills you want to evaluate.
                Gemini AI will generate a separate assessment for each skill.
              </p>
            </div>
          </div>

          <div className="mt-7">
            <label
              htmlFor="skill-input"
              className="mb-2 block text-xs font-semibold text-[#CBD5E1]"
            >
              Enter your skills
            </label>

            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                id="skill-input"
                value={skillInput}
                onChange={e => setSkillInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addSkill();
                  }
                }}
                placeholder="e.g. Python, Java, React, Communication"
                disabled={isLoading}
                className="min-w-0 flex-1 rounded-xl border border-white/10 bg-[#080D17]/80 px-4 py-3 text-sm text-white outline-none focus:border-[#00F2FE]/60"
              />

              <button
                type="button"
                onClick={() => addSkill()}
                disabled={!skillInput.trim() || isLoading}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#00F2FE]/30 bg-[#00F2FE]/10 px-5 py-3 text-sm font-semibold text-[#00F2FE] disabled:opacity-40"
              >
                <Plus className="h-4 w-4" />
                Add skill
              </button>
            </div>

            <p className="mt-2 text-[11px] text-[#64748B]">
              Press Enter or use commas to add skills. Maximum 5 skills.
            </p>
          </div>

          <div className="mt-6">
            <p className="mb-3 text-xs font-semibold text-[#CBD5E1]">
              Quick suggestions
            </p>

            <div className="flex flex-wrap gap-2">
              {suggestedSkills.map(skill => {
                const added = skills.some(
                  s => s.toLowerCase() === skill.toLowerCase()
                );

                return (
                  <button
                    key={skill}
                    type="button"
                    disabled={added || isLoading || skills.length >= 5}
                    onClick={() => addSkill(skill)}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-[#94A3B8] disabled:opacity-35"
                  >
                    {added ? '✓ ' : '+ '}
                    {skill}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-7 border-t border-white/[0.07] pt-5">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-semibold text-[#CBD5E1]">
                Your selected skills
              </p>

              <span className="text-[10px] text-[#94A3B8]">
                {skills.length} added
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {skills.map(skill => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-2 rounded-lg border border-[#14B8A6]/25 bg-[#14B8A6]/[0.08] px-3 py-2 text-xs text-[#99F6E4]"
                >
                  {skill}

                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    disabled={isLoading}
                    aria-label={`Remove ${skill}`}
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </span>
              ))}

              {skills.length === 0 && (
                <p className="text-xs text-[#64748B]">
                  No skills added yet.
                </p>
              )}
            </div>
          </div>

          {error && (
            <p role="alert" className="mt-4 text-xs text-rose-400">
              {error}
            </p>
          )}

          <div className="mt-6 flex justify-end border-t border-white/[0.07] pt-5">
            <button
              type="button"
              onClick={startAssessment}
              disabled={isLoading}
              className="inline-flex items-center gap-2 rounded-xl bg-[#00F2FE] px-5 py-3 text-xs font-bold text-[#06070B] disabled:opacity-50"
            >
              {isLoading
                ? 'Generating questions...'
                : 'Start assessment'}

              {!isLoading && (
                <ArrowRight className="h-4 w-4" />
              )}
            </button>
          </div>

          {isLoading && (
            <p className="mt-3 text-center text-xs text-[#00F2FE]">
              Gemini AI is preparing your questions. Please wait...
            </p>
          )}

        </section>
      </div>
    );
  }

  // ==========================================
  // RESULTS SCREEN
  // ==========================================

  if (phase === 'results' && results) {
    return (
      <section className="glass-panel rounded-2xl border border-white/[0.08] p-6 sm:p-8">

        <div className="text-center">
          <Award className="mx-auto h-12 w-12 text-[#00F2FE]" />

          <h2 className="mt-3 text-2xl font-bold text-white">
            Assessment completed!
          </h2>

          <p className="mt-2 text-sm text-[#94A3B8]">
            Your assessment results have been saved successfully.
          </p>

          <p className="mt-5 text-5xl font-bold text-[#00F2FE]">
            {results.percentage}%
          </p>

          <p className="mt-1 text-xs text-[#94A3B8]">
            {results.score} correct out of {results.total} questions
          </p>
        </div>

        <div className="mt-7 space-y-3">
          {results.skills.map(result => (
            <div
              key={result.skill}
              className="flex items-center justify-between rounded-xl border border-white/[0.08] bg-white/[0.03] p-4"
            >
              <div>
                <p className="text-sm font-semibold text-white">
                  {result.skill}
                </p>

                <p className="mt-1 text-xs text-[#94A3B8]">
                  {result.score} / {result.total} correct
                </p>
              </div>

              <span className="text-lg font-bold text-[#14B8A6]">
                {result.percentage}%
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={restartAssessment}
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#00F2FE] px-5 py-3 text-xs font-bold text-[#06070B]"
        >
          <RotateCcw className="h-4 w-4" />
          Start again
        </button>

      </section>
    );
  }

  // ==========================================
  // MCQ ASSESSMENT SCREEN
  // ==========================================

  if (!currentQuestion) {
    return (
      <section className="glass-panel rounded-2xl p-6">
        <p className="text-sm text-rose-400">
          No questions found for this skill. Please restart the assessment.
        </p>

        <button
          onClick={restartAssessment}
          className="mt-4 rounded-lg bg-[#00F2FE] px-4 py-2 text-xs font-bold text-[#06070B]"
        >
          Restart
        </button>
      </section>
    );
  }

  const answeredCount = questions.filter(
    question => answers[String(question.id)] !== undefined
  ).length;

  const progress =
    ((questionIndex + 1) / questions.length) * 100;

  const isLastQuestion =
    questionIndex === questions.length - 1;

  const isLastSkill =
    skillIndex === skills.length - 1;

  return (
    <section className="glass-panel rounded-2xl border border-white/[0.08] p-5 sm:p-7">

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.18em] text-[#00F2FE]">
            Skill assessment
          </p>

          <h2 className="mt-1 text-xl font-bold text-white">
            {currentSkill}
          </h2>

          <p className="mt-1 text-xs text-[#94A3B8]">
            Skill {skillIndex + 1} of {skills.length}
          </p>
        </div>

        <span className="rounded-full border border-[#14B8A6]/30 bg-[#14B8A6]/10 px-3 py-1.5 text-xs text-[#99F6E4]">
          {currentQuestion.d}
        </span>
      </div>

      <div className="mt-6">
        <div className="mb-2 flex justify-between text-xs text-[#94A3B8]">
          <span>
            Question {questionIndex + 1} of {questions.length}
          </span>

          <span>{Math.round(progress)}% completed</span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-[#14B8A6] transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="mt-7">
        <p className="text-xs text-[#94A3B8]">
          Choose the correct answer:
        </p>

        <h3 className="mt-3 text-lg font-semibold leading-relaxed text-white">
          {currentQuestion.q}
        </h3>

        <div className="mt-6 space-y-3">
          {currentQuestion.o.map((option, index) => {
            const selected = selectedAnswer === index;

            return (
              <button
                key={index}
                type="button"
                onClick={() => selectAnswer(index)}
                disabled={isLoading}
                className={`flex w-full items-center gap-3 rounded-xl border p-4 text-left text-sm transition ${
                  selected
                    ? 'border-[#00F2FE]/60 bg-[#00F2FE]/10 text-white'
                    : 'border-white/10 bg-white/[0.02] text-[#CBD5E1] hover:border-[#00F2FE]/30'
                }`}
              >
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs ${
                    selected
                      ? 'border-[#00F2FE] bg-[#00F2FE] text-[#06070B]'
                      : 'border-white/20'
                  }`}
                >
                  {String.fromCharCode(65 + index)}
                </span>

                {option}

                {selected && (
                  <CheckCircle2 className="ml-auto h-4 w-4 text-[#00F2FE]" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {error && (
        <p role="alert" className="mt-4 text-xs text-rose-400">
          {error}
        </p>
      )}

      <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.08] pt-5">

        <p className="text-xs text-[#94A3B8]">
          {answeredCount} of {questions.length} answered
        </p>

        <div className="flex gap-2">
          <button
            type="button"
            disabled={questionIndex === 0 || isLoading}
            onClick={() =>
              setQuestionIndex(index => index - 1)
            }
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2.5 text-xs text-white disabled:opacity-30"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </button>

          {!isLastQuestion ? (
            <button
              type="button"
              disabled={
                selectedAnswer === undefined || isLoading
              }
              onClick={() =>
                setQuestionIndex(index => index + 1)
              }
              className="inline-flex items-center gap-2 rounded-lg bg-[#00F2FE] px-4 py-2.5 text-xs font-bold text-[#06070B] disabled:opacity-40"
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              disabled={
                answeredCount !== questions.length || isLoading
              }
              onClick={finishCurrentSkill}
              className="rounded-lg bg-[#14B8A6] px-4 py-2.5 text-xs font-bold text-[#04110F] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isLoading
                ? 'Submitting...'
                : isLastSkill
                  ? 'Submit Assessment'
                  : 'Next Skill'}
            </button>
          )}
        </div>
      </div>

      {isLoading && (
        <p className="mt-3 text-center text-xs text-[#00F2FE]">
          Submitting your assessment. Please wait...
        </p>
      )}

    </section>
  );
};
